import {Actor} from "/src/models/Actor"
import {GhostLightScene} from "/src/schema/schema"
import {Selection} from "/src/services/Selection"
import {makeAutoObservable} from "mobx"
import {Config} from "/src/models/Config"

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
    Actor.destroy(...Actor.all)
  }

  private serialize() {
    const scene: GhostLightScene = {
      config: Config,
      actors: Actor.all,
    }
    return JSON.stringify(scene, null, 2)
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
    const stream = await this.active.createWritable()
    await stream.write(Scene.serialize())
    await stream.close()
    console.log("saved")
  }

}
