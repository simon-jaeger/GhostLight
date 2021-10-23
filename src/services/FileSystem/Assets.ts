import {makeAutoObservable} from "mobx"
import {uImage} from "/src/helpers/utils"
import {FileSystem} from "/src/services/FileSystem/FileSystem"

type Asset = { key: string, image: HTMLImageElement, }

// TODO: simplify map to key-->Image, should be possible after actor types are implemented
export const Assets = new class {
  private fs!: FileSystem
  map: Map<string, Asset> = new Map()
  active: Asset = {key: "", image: new Image()}

  constructor() {
    makeAutoObservable(this)
  }

  get all() {
    return Array.from(this.map.values())
  }

  private clear() {
    this.map.forEach(x => URL.revokeObjectURL(x.image.src))
    this.map.clear()
  }

  async register(dirHandle: FileSystemDirectoryHandle) {
    this.clear()
    this.fs = await FileSystem.make(dirHandle)
    for (const filename of this.fs.filenames) {
      const key = filename
      const url = URL.createObjectURL(await this.fs.readRaw(filename))
      const image = await uImage(url)
      this.map.set(key, {key, image})
    }
  }

  async import(file: File) {
    await this.fs.write(file.name, file)
    const key = file.name
    const url = URL.createObjectURL(file)
    const image = await uImage(url)
    this.map.set(key, {key, image})
  }

  // TODO: better fallback and color support
  get(key: string): Asset {
    const asset = this.map.get(key)
    if (asset === undefined) return {key: "", image: new Image()}
    return asset
  }

}
