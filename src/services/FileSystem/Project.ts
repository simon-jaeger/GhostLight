import {Textures} from "/src/services/FileSystem/Textures"
import {Scene} from "/src/services/FileSystem/Scene"
import {makeAutoObservable} from "mobx"

export const Project = new class {
  isOpen = false
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

    let rootDirHandle, scenesDirHandle, texturesDirHandle
    try {
      rootDirHandle = await picked.getDirectoryHandle(this.structure.root)
      scenesDirHandle = await rootDirHandle.getDirectoryHandle(this.structure.scenes)
      texturesDirHandle = await rootDirHandle.getDirectoryHandle(this.structure.textures)
    } catch {
      return alert("ERROR: Not a valid GhostLight directory.")
    }

    Scene.clear()
    await Scene.register(scenesDirHandle)
    await Textures.register(texturesDirHandle)
    await Scene.load(Scene.all[0])

    this.isOpen = true
  }

  async create() {
    const picked = await showDirectoryPicker({startIn: "documents"})
    await picked.requestPermission({mode: "readwrite"})

    const rootDirHandle = await picked.getDirectoryHandle(this.structure.root, {create: true})
    const scenesDirHandle = await rootDirHandle.getDirectoryHandle(this.structure.scenes, {create: true})
    const texturesDirHandle = await rootDirHandle.getDirectoryHandle(this.structure.textures, {create: true})

    Scene.clear()
    await Scene.register(scenesDirHandle)
    await Textures.register(texturesDirHandle)
    const emptyScene = await Scene.create("scene.json")
    await Scene.load(emptyScene)

    this.isOpen = true
  }

}
