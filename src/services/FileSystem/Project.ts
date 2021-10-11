import {Textures} from "/src/services/FileSystem/Textures"
import {Scene} from "/src/services/FileSystem/Scene"
import {makeAutoObservable} from "mobx"
import * as idb from "idb-keyval"

export const Project = new class {
  isOpen = false
  private structure = {
    root: ".ghostlight",
    scenes: "scenes",
    textures: "textures",
  }

  constructor() {
    makeAutoObservable(this)
  }

  async open(dirHandle?: FileSystemDirectoryHandle) {
    const picked = dirHandle ?? await showDirectoryPicker({id: "gl-alpha"})
    await picked.requestPermission({mode: "readwrite"})

    let rootDirHandle, scenesDirHandle, texturesDirHandle
    try {
      rootDirHandle = await picked.getDirectoryHandle(this.structure.root)
      scenesDirHandle = await rootDirHandle.getDirectoryHandle(this.structure.scenes)
      texturesDirHandle = await rootDirHandle.getDirectoryHandle(this.structure.textures)
    } catch {
      return alert("ERROR: Not a valid GhostLight directory.")
    }
    await this.addToRecent(picked)

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
    await this.addToRecent(picked)

    Scene.clear()
    await Scene.register(scenesDirHandle)
    await Textures.register(texturesDirHandle)
    const emptyScene = await Scene.create("scene.json")
    await Scene.load(emptyScene)

    this.isOpen = true
  }

  async getRecent(): Promise<FileSystemDirectoryHandle[]> {
    return await idb.get("recent") ?? []
  }

  private async addToRecent(dirHandle: FileSystemDirectoryHandle) {
    let recent = await this.getRecent()
    recent = recent.filter((x) => x.name !== dirHandle.name) // rm duplicates
    recent.push(dirHandle)
    recent = recent.slice(-4) // limit to 4 entries
    await idb.set("recent", recent)
  }

}
