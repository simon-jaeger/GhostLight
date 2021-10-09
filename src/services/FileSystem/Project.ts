import {Textures} from "/src/services/FileSystem/Textures"
import {Scene} from "/src/services/FileSystem/Scene"
import {makeAutoObservable} from "mobx"

export const Project = new class {
  readonly structure = {
    root: ".ghostlight",
    scenes: "scenes",
    textures: "textures",
  }

  constructor() {
    makeAutoObservable(this)
  }

  async open() {
    const picked = await showDirectoryPicker({id: "GhostLight_Alpha"})
    await picked.requestPermission({mode: "readwrite"})

    let rootDir, scenesDir, texturesDir
    try {
      rootDir = await picked.getDirectoryHandle(this.structure.root)
      scenesDir = await rootDir.getDirectoryHandle(this.structure.scenes)
      texturesDir = await rootDir.getDirectoryHandle(this.structure.textures)
    } catch {
      return alert("ERROR: Not a valid GhostLight directory.")
    }

    Scene.clear()
    await Scene.register(scenesDir)
    await Textures.load(texturesDir)
    await Scene.load(Scene.all[0])
  }

}
