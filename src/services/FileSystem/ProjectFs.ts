import {AssetsFs} from "/src/services/FileSystem/AssetsFs"
import {SceneFs} from "/src/services/FileSystem/SceneFs"
import {makeAutoObservable} from "mobx"
import * as idb from "idb-keyval"
import {TypesFs} from "/src/services/FileSystem/TypesFs"
import {ParserFs} from "/src/services/FileSystem/ParserFs"

export const ProjectFs = new class {
  isOpen = false
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

    let rootDirHandle, scenesDirHandle, assetsDirHandle, typesDirHandle,
      parserDirHandle
    try {
      rootDirHandle = await projectDirHandle.getDirectoryHandle(this.structure.root, {create})
      scenesDirHandle = await rootDirHandle.getDirectoryHandle(this.structure.scenes, {create})
      assetsDirHandle = await rootDirHandle.getDirectoryHandle(this.structure.assets, {create})
      typesDirHandle = await rootDirHandle.getDirectoryHandle(this.structure.types, {create})
      parserDirHandle = await rootDirHandle.getDirectoryHandle(this.structure.parser, {create})
    } catch {
      return alert("ERROR: Not a valid GhostLight directory.")
    }
    await this.addToRecent(projectDirHandle)

    SceneFs.clear()
    await ParserFs.setup(parserDirHandle)
    await AssetsFs.setup(assetsDirHandle)
    await TypesFs.setup(typesDirHandle)
    await SceneFs.setup(scenesDirHandle)
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
