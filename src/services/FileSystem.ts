import __definitions__ from "wicg-file-system-access"
import {Textures} from "/src/services/Textures"
import {Scenes} from "/src/services/Scenes"
import {makeAutoObservable} from "mobx"

// TODO: allow multiple scenes in .ghostlight dir?

export const FileSystem = new class {
  readonly structure = {
    root: ".ghostlight",
    textures: "textures",
    scenes: "scenes",
  }

  rootDir!: FileSystemDirectoryHandle
  texturesDir!: FileSystemDirectoryHandle
  scenesDir!: FileSystemDirectoryHandle

  constructor() {
    makeAutoObservable(this)
  }

  async open() {
    const picked = await showDirectoryPicker({id: "GhostLight_Alpha"})
    await picked.requestPermission({mode: "readwrite"})

    try {
      this.rootDir = await picked.getDirectoryHandle(this.structure.root)
      this.texturesDir = await this.rootDir.getDirectoryHandle(this.structure.textures)
      this.scenesDir = await this.rootDir.getDirectoryHandle(this.structure.scenes)
    } catch {
      return alert("ERROR: Not a valid GhostLight directory.")
    }

    Scenes.clearAll()
    await Textures.load(this.texturesDir)
    await Scenes.register(this.scenesDir)
    await Scenes.load(Scenes.all[0])
  }

  async save() {
    const stream = await Scenes.active.createWritable()
    await stream.write(Scenes.serialize())
    await stream.close()
    console.log("saved")
  }
}
