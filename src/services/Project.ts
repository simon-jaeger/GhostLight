import {Textures} from "/src/services/Textures"
import {Scene} from "/src/services/Scene"
import {makeAutoObservable} from "mobx"

export const Project = new class {
  readonly structure = {
    root: ".ghostlight",
    scenes: "scenes",
    textures: "textures",
  }

  rootDir!: FileSystemDirectoryHandle
  scenesDir!: FileSystemDirectoryHandle
  texturesDir!: FileSystemDirectoryHandle

  constructor() {
    makeAutoObservable(this)
  }

  async open() {
    const picked = await showDirectoryPicker({id: "GhostLight_Alpha"})
    await picked.requestPermission({mode: "readwrite"})

    try {
      this.rootDir = await picked.getDirectoryHandle(this.structure.root)
      this.scenesDir = await this.rootDir.getDirectoryHandle(this.structure.scenes)
      this.texturesDir = await this.rootDir.getDirectoryHandle(this.structure.textures)
    } catch {
      return alert("ERROR: Not a valid GhostLight directory.")
    }

    Scene.clear()
    await Scene.register(this.scenesDir)
    await Textures.load(this.texturesDir)
    await Scene.load(Scene.all[0])
  }

}
