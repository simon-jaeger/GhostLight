import {Actor} from "/src/models/Actor"
import {GhostLightScene} from "/src/schema/schema"
import {Selection} from "/src/services/Selection"
import {makeAutoObservable} from "mobx"
import {Config} from "/src/models/Config"
import {Project} from "/src/services/Project"
import {uClone} from "/src/helpers/utils"
import uuid4 from "uuid4"

export const Scene = new class {
  private map: Map<string, FileSystemFileHandle> = new Map()
  private active = null as unknown as FileSystemFileHandle

  constructor() {
    makeAutoObservable(this)
  }

  get all() {
    return Array.from(this.map.keys()).sort()
  }

  get filename() {
    return this.active.name
  }

  get name() {
    return this.filename.replace(/\.json$/, "")
  }

  clear() {
    Selection.clear()
    Config.reset()
    Actor.destroy(...Actor.all)
  }

  async register(directory: FileSystemDirectoryHandle) {
    this.map.clear()
    for await (const file of directory.values()) {
      this.map.set(file.name, file as FileSystemFileHandle)
    }
  }

  async load(filename: string) {
    this.active = this.map.get(filename)!
    const json = await this.active.getFile().then(x => x.text())
    const scene: GhostLightScene = JSON.parse(json)

    this.clear()
    Object.assign(Config, scene.config)
    Actor.createMany(scene.actors)
  }

  async save() {
    const scene: GhostLightScene = {
      config: Config,
      actors: Actor.all,
    }
    const stream = await this.active.createWritable()
    await stream.write(JSON.stringify(scene, null, 2))
    await stream.close()
    console.log("saved")
  }

  async create(filename: string) {
    const handle = await Project.scenesDir.getFileHandle(filename, {create: true})
    const defaultScene: GhostLightScene = {
      config: Config.getDefaults(),
      actors: [],
    }
    const stream = await handle.createWritable()
    await stream.write(JSON.stringify(defaultScene, null, 2))
    await stream.close()
    this.map.set(filename, handle)
    console.log("created")
  }

  async destroy() {
    this.map.delete(this.active.name)
    await Project.scenesDir.removeEntry(this.active.name)
    console.log("deleted")
  }

  async duplicate() {
    let filename = this.name + "-copy-" + Date.now() + ".json"
    const handle = await Project.scenesDir.getFileHandle(filename, {create: true})
    const scene: GhostLightScene = {
      config: Config,
      actors: Actor.all.map((actor) => {
        const clone = uClone(actor)
        clone.id = uuid4()
        return clone
      }),
    }
    const stream = await handle.createWritable()
    await stream.write(JSON.stringify(scene, null, 2))
    await stream.close()
    this.map.set(filename, handle)
    console.log("duplicated")
    return filename
  }

}
