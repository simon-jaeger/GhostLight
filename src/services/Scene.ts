import {Actor} from "/src/models/Actor"
import {GhostLightScene} from "/src/schema/schema"
import {Selection} from "/src/services/Selection"
import {makeAutoObservable} from "mobx"
import {Config} from "/src/models/Config"
import {Project} from "/src/services/Project"

export const Scene = new class {
  private map: Map<string, FileSystemFileHandle> = new Map()
  private active = null as unknown as FileSystemFileHandle

  constructor() {
    makeAutoObservable(this)
  }

  get all() {
    return Array.from(this.map.keys())
  }

  get name() {
    return this.active.name
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

}
