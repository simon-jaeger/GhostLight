import {Actor} from "/src/models/Actor"
import {GhostLightScene} from "/src/schema/schema"
import {Selection} from "/src/services/Selection"
import {makeAutoObservable, toJS} from "mobx"
import {Config} from "/src/models/Config"
import {FileSystem} from "/src/services/FileSystem/FileSystem"
import {History} from "/src/services/History"

export const SceneFs = new class {
  private fs!: FileSystem
  active = ""

  readonly data: GhostLightScene = {
    config: Config,
    actors: Actor.all,
  }

  constructor() {
    makeAutoObservable(this, {all: false})
  }

  get name() {
    return this.active.replace(/\.json$/, "")
  }

  get all() {
    if (!this.fs) return []
    return Array.from(this.fs.filenames).sort()
  }

  async register(dirHandle: FileSystemDirectoryHandle) {
    this.fs = await FileSystem.make(dirHandle)
  }

  private ensureUnique(filename: string) {
    return (this.fs.filenames.has(filename))
      ? filename.replace(/\.json$/, "-" + Date.now() + ".json")
      : filename
  }

  clear() {
    Selection.clear()
    Config.reset()
    Actor.destroy(...Actor.all)
  }

  async open(filename: string) {
    this.active = filename
    const json = await this.fs.read(filename)
    this.load(json)
    History.reset(json)
  }

  load(json: string) {
    const scene: GhostLightScene = JSON.parse(json)
    this.clear()
    Object.assign(Config, scene.config)
    Actor.createMany(scene.actors)
  }

  // TODO: maybe cleanup orphaned props before save
  async save() {
    await this.fs.write(this.active, JSON.stringify(this.data, null, 2))
    console.log("saved")
  }

  async create(filename: string) {
    filename = this.ensureUnique(filename)
    const defaultScene: GhostLightScene = {
      config: Config.defaults,
      actors: [],
    }
    await this.fs.write(filename, JSON.stringify(defaultScene, null, 2))
    return filename
  }

  async destroy() {
    await this.fs.destroy(this.active)
  }

  async rename(newFilename: string) {
    newFilename = this.ensureUnique(newFilename)
    await this.fs.rename(this.active, newFilename)
    this.active = newFilename
  }

  async duplicate() {
    let filename = this.active.replace(/\.json$/, "-copy.json")
    filename = this.ensureUnique(filename)
    await this.fs.copy(this.active, filename)
    return filename
  }

}
