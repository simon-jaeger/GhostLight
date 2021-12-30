import {AssetsFs} from "/src/services/FileSystem/AssetsFs"
import {SceneFs} from "/src/services/FileSystem/SceneFs"
import {makeAutoObservable} from "mobx"
import * as idb from "idb-keyval"
import {TypesFs} from "/src/services/FileSystem/TypesFs"
import {App} from "/src/services/App"
import {FileSystem} from "/src/services/FileSystem/FileSystem"

export const ProjectFs = new class {
  isOpen = false
  rootDirHandle: FileSystemDirectoryHandle | null = null
  scenesDirHandle: FileSystemDirectoryHandle | null = null
  assetsDirHandle: FileSystemDirectoryHandle | null = null
  typesDirHandle: FileSystemDirectoryHandle | null = null
  private structure = {
    root: ".ghostlight",
    scenes: "scenes",
    assets: "assets",
    types: "types",
  }

  constructor() {
    makeAutoObservable(this)
  }

  async open(dirHandle?: FileSystemDirectoryHandle | null, create = false) {
    const projectDirHandle = dirHandle ?? await showDirectoryPicker({id: "ghostlight"})
    await projectDirHandle.requestPermission({mode: "readwrite"})

    try {
      this.rootDirHandle = await projectDirHandle.getDirectoryHandle(this.structure.root, {create})
      this.scenesDirHandle = await this.rootDirHandle.getDirectoryHandle(this.structure.scenes, {create})
      this.assetsDirHandle = await this.rootDirHandle.getDirectoryHandle(this.structure.assets, {create})
      this.typesDirHandle = await this.rootDirHandle.getDirectoryHandle(this.structure.types, {create})
    } catch {
      return alert("ERROR: Not a valid GhostLight directory.")
    }
    await this.addToRecent(projectDirHandle)

    await AssetsFs.setup(this.assetsDirHandle)
    await TypesFs.setup(this.typesDirHandle)
    await SceneFs.setup(this.scenesDirHandle)
    if (create) await SceneFs.create("scene.json")
    await SceneFs.open(SceneFs.all[0])

    App.setMode("select")
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
    this.isOpen = false
  }

  async openSample(key: string) {
    const samples = {
      platformer: {
        assets: import.meta.globEager("/samples/platformer/.ghostlight/assets/*"),
        scene: import("/samples/platformer/.ghostlight/scenes/scene.json"),
        types: import("/samples/platformer/.ghostlight/types/types.json"),
      },
      shooter: {
        assets: import.meta.globEager("/samples/shooter/.ghostlight/assets/*"),
        scene: import("/samples/shooter/.ghostlight/scenes/scene.json"),
        types: import("/samples/shooter/.ghostlight/types/types.json"),
      },
    }

    const projectDirHandle = await showDirectoryPicker({id: "ghostlight"})
    await projectDirHandle.requestPermission({mode: "readwrite"})

    const rootDirHandle = await projectDirHandle.getDirectoryHandle(this.structure.root, {create: true})
    const fsScenes = await FileSystem.make(await rootDirHandle.getDirectoryHandle(this.structure.scenes, {create: true}))
    const fsTypes = await FileSystem.make(await rootDirHandle.getDirectoryHandle(this.structure.types, {create: true}))
    const fsAssets = await FileSystem.make(await rootDirHandle.getDirectoryHandle(this.structure.assets, {create: true}))

    const sample = samples[key]
    await fsScenes.write("scene.json", JSON.stringify(await sample.scene))
    await fsTypes.write("types.json", JSON.stringify((await sample.types).default))
    for (const module of Object.values(sample.assets) as { default: any }[]) {
      const path = module.default
      const filename = path.split("/").reverse()[0].replace(/\..+\./, ".") // no hash locally
      const data = await (fetch(path).then((x) => x.blob()))
      await fsAssets.write(filename, data)
    }

    await this.open(projectDirHandle)
  }

}

if (import.meta.hot) {
  // prevent reload
  import.meta.hot.accept([
    "/samples/platformer/.ghostlight/assets/*",
    "/samples/platformer/.ghostlight/scenes/scene.json",
    "/samples/platformer/.ghostlight/scenes/types.json",
    "/samples/shooter/.ghostlight/assets/*",
    "/samples/shooter/.ghostlight/scenes/scene.json",
    "/samples/shooter/.ghostlight/scenes/types.json",
  ], () => null)
}
