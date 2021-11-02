import {AssetsFs} from "/src/services/FileSystem/AssetsFs"
import {SceneFs} from "/src/services/FileSystem/SceneFs"
import {makeAutoObservable} from "mobx"
import * as idb from "idb-keyval"
import {TypesFs} from "/src/services/FileSystem/TypesFs"

export const ProjectFs = new class {
  isOpen = false
  private structure = {
    root: ".ghostlight",
    scenes: "scenes",
    assets: "assets",
    types: "types",
  }

  constructor() {
    makeAutoObservable(this)
  }

  async open(dirHandle?: FileSystemDirectoryHandle) {
    const picked = dirHandle ?? await showDirectoryPicker({id: "gl-alpha"})
    await picked.requestPermission({mode: "readwrite"})

    let rootDirHandle: FileSystemDirectoryHandle, scenesDirHandle,
      assetsDirHandle, typesDirHandle
    try {
      rootDirHandle = await picked.getDirectoryHandle(this.structure.root)
      scenesDirHandle = await rootDirHandle.getDirectoryHandle(this.structure.scenes)
      assetsDirHandle = await rootDirHandle.getDirectoryHandle(this.structure.assets)
      typesDirHandle = await rootDirHandle.getDirectoryHandle(this.structure.types)
    } catch {
      return alert("ERROR: Not a valid GhostLight directory.")
    }
    await this.addToRecent(picked)

    SceneFs.clear()
    await AssetsFs.register(assetsDirHandle)
    await TypesFs.register(typesDirHandle)
    await SceneFs.register(scenesDirHandle)
    await SceneFs.open(SceneFs.all[0])

    this.isOpen = true
  }

  async create() {
    const picked = await showDirectoryPicker({startIn: "documents"})
    await picked.requestPermission({mode: "readwrite"})

    const rootDirHandle = await picked.getDirectoryHandle(this.structure.root, {create: true})
    const scenesDirHandle = await rootDirHandle.getDirectoryHandle(this.structure.scenes, {create: true})
    const assetsDirHandle = await rootDirHandle.getDirectoryHandle(this.structure.assets, {create: true})
    const typesDirHandle = await rootDirHandle.getDirectoryHandle(this.structure.types, {create: true})
    await this.addToRecent(picked)

    SceneFs.clear()
    await AssetsFs.register(assetsDirHandle)
    await TypesFs.register(typesDirHandle)
    await SceneFs.register(scenesDirHandle)
    const emptyScene = await SceneFs.create("scene.json")
    await SceneFs.open(emptyScene)

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
