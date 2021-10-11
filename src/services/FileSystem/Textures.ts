import {makeAutoObservable} from "mobx"
import {uColorToUrl, uImage} from "/src/helpers/utils"
import {FileSystem} from "/src/services/FileSystem/FileSystem"

type Texture = { key: string, url: string, width: number, height: number }

export const Textures = new class {
  private fs!: FileSystem
  map: Map<string, Texture> = new Map()
  active: Texture = {key: "", url: "", width: 0, height: 0}

  constructor() {
    makeAutoObservable(this)
  }

  get all() {
    return Array.from(this.map.values())
  }

  private clear() {
    this.map.forEach(x => URL.revokeObjectURL(x.url))
    this.map.clear()
  }

  async register(dirHandle: FileSystemDirectoryHandle) {
    this.clear()
    this.fs = await FileSystem.make(dirHandle)
    for (const filename of this.fs.filenames) {
      const key = filename
      const url = URL.createObjectURL(await this.fs.readRaw(filename))
      const {width, height} = await uImage(url)
      this.map.set(key, {key, url, width, height})
    }
  }

  get(key: string) {
    const tx = this.map.get(key)
    if (tx === undefined)
      return key.startsWith("#")
        ? {key: key, url: uColorToUrl(key), width: 1, height: 1}
        : {key: "ERROR", url: uColorToUrl("red"), width: 1, height: 1}
    return tx
  }

}
