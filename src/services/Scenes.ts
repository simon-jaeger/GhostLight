import {Actor} from "/src/models/Actor"
import {GhostLightScene} from "/src/schema/schema"
import {Selection} from "/src/services/Selection"
import {observable} from "mobx"
import {Config} from "/src/models/Config"

export const Scenes = new class {
  readonly all: FileSystemFileHandle[] = observable([])
  active!: FileSystemFileHandle

  clear() {
    Selection.clear()
    Actor.destroy(...Actor.all)
  }

  clearAll() {
    this.all.length = 0
    this.clear()
  }

  async register(directory: FileSystemDirectoryHandle) {
    for await (const file of directory.values()) {
      this.all.push(file as FileSystemFileHandle)
    }
  }

  async load(file: FileSystemFileHandle) {
    this.clear()
    this.active = file
    const json = await file.getFile().then(x => x.text())
    const scene: GhostLightScene = JSON.parse(json)
    Object.assign(Config, scene.config)
    Actor.createMany(scene.actors)
  }

  find(name: string) {
    return this.all.find(x => x.name === name)
  }

  serialize() {
    const scene: GhostLightScene = {
      config: Config,
      actors: Actor.all,
    }
    return JSON.stringify(scene, null, 2)
  }

}
