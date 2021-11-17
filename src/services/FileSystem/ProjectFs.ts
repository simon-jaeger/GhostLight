import {AssetsFs} from "/src/services/FileSystem/AssetsFs"
import {SceneFs} from "/src/services/FileSystem/SceneFs"
import {makeAutoObservable} from "mobx"
import * as idb from "idb-keyval"
import {TypesFs} from "/src/services/FileSystem/TypesFs"
import {ParserFs} from "/src/services/FileSystem/ParserFs"

export const ProjectFs = new class {
  isOpen = false
  rootDirHandle: FileSystemDirectoryHandle | null = null
  scenesDirHandle: FileSystemDirectoryHandle | null = null
  assetsDirHandle: FileSystemDirectoryHandle | null = null
  typesDirHandle: FileSystemDirectoryHandle | null = null
  parserDirHandle: FileSystemDirectoryHandle | null = null
  private structure = {
    root: ".ghostlight",
    scenes: "scenes",
    assets: "assets",
    types: "types",
    parser: "parser",
  }

  constructor() {
    makeAutoObservable(this)
  }

  async open(dirHandle?: FileSystemDirectoryHandle | null, create = false) {
    const projectDirHandle = dirHandle ?? await showDirectoryPicker({id: "gl-alpha"})
    await projectDirHandle.requestPermission({mode: "readwrite"})

    try {
      this.rootDirHandle = await projectDirHandle.getDirectoryHandle(this.structure.root, {create})
      this.scenesDirHandle = await this.rootDirHandle.getDirectoryHandle(this.structure.scenes, {create})
      this.assetsDirHandle = await this.rootDirHandle.getDirectoryHandle(this.structure.assets, {create})
      this.typesDirHandle = await this.rootDirHandle.getDirectoryHandle(this.structure.types, {create})
      this.parserDirHandle = await this.rootDirHandle.getDirectoryHandle(this.structure.parser, {create})
    } catch {
      return alert("ERROR: Not a valid GhostLight directory.")
    }
    await this.addToRecent(projectDirHandle)

    SceneFs.clear()
    await ParserFs.setup(this.parserDirHandle)
    await AssetsFs.setup(this.assetsDirHandle)
    await TypesFs.setup(this.typesDirHandle)
    await SceneFs.setup(this.scenesDirHandle)
    if (create) await SceneFs.create("scene.json")
    await SceneFs.open(SceneFs.all[0])

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

  close() {
    SceneFs.clear()
    this.isOpen = false
  }

}
