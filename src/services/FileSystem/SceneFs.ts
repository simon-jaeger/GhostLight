import {Actor} from "/src/models/Actor"
import {Selection} from "/src/services/Selection"
import {IReactionDisposer, makeAutoObservable, reaction, toJS} from "mobx"
import {Config} from "/src/models/Config"
import {FileSystem} from "/src/services/FileSystem/FileSystem"
import {History} from "/src/services/History"
import {Grid} from "/src/services/Grid"
import {uClone, uDebounce} from "/src/helpers/utils"
import {Type} from "/src/models/Type"
import {Debugger} from "inspector"

type SceneFile = { config: typeof Config, grid: typeof Grid, actors: Actor[] }

export const SceneFs = new class {
  private fs!: FileSystem
  active = ""
  private data: SceneFile = {
    config: Config,
    grid: Grid,
    actors: Actor.all,
  }
  private autoSaveDisposer: IReactionDisposer | null = null

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

  async setup(dirHandle: FileSystemDirectoryHandle) {
    this.autoSaveOff()
    this.fs = await FileSystem.make(dirHandle)
    this.autoSaveOn()
  }

  private autoSaveOn() {
    this.autoSaveDisposer = reaction(() => toJS(this.data) && toJS(Type.all), uDebounce(() => {
      this.save()
    }, 1000))
  }
  private autoSaveOff() {
    this.autoSaveDisposer?.()
  }

  private ensureUnique(filename: string) {
    return (this.fs.filenames.has(filename))
      ? filename.replace(/\.json$/, "-" + Date.now() + ".json")
      : filename
  }

  async open(filename: string) {
    this.active = filename
    const json = await this.fs.read(filename)
    this.load(json)
    History.reset(Actor.all)
    await this.save()
  }

  load(json: string) {
    this.autoSaveOff()
    const scene: SceneFile = JSON.parse(json)
    Selection.clear()
    Object.assign(Config, scene.config)
    Object.assign(Grid, scene.grid)
    Actor.destroy(...Actor.all)
    Actor.createMany(scene.actors)
    this.autoSaveOn()
  }

  private async save() {
    console.log('save')
    await this.fs?.write(this.active, this.serialize())
  }

  async create(filename: string) {
    filename = this.ensureUnique(filename)
    const defaultScene: SceneFile = {
      config: Config.defaults,
      grid: Grid.defaults,
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

  private serialize() {
    const scene = JSON.parse(JSON.stringify(this.data)) // generate data only clone
    const types = Type.all
    for (const a of scene.actors) {
      // denormalize
      const actor = a as Actor & Type
      const type = types.find(x => x.id === actor.type_id) ?? Type.notype
      // @ts-ignore
      actor.type = type.name
      actor.texture = type.texture
      actor.resize = type.resize
      type.props.forEach(p => {
        actor.props[p.name] = actor.props[p.id] ?? p.default
      })
    }
    return JSON.stringify(scene, null, 2)
  }

}
