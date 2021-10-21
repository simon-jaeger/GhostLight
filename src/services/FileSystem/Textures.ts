import {makeAutoObservable} from "mobx"
import {uColorToUrl, uImage} from "/src/helpers/utils"
import {FileSystem} from "/src/services/FileSystem/FileSystem"

type Texture = { key: string, url: string, width: number, height: number, image: HTMLImageElement }

export const Textures = new class {
  private fs!: FileSystem
  map: Map<string, Texture> = new Map()
  active: Texture = {key: "", url: "", width: 0, height: 0, image: new Image()}

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
      const image = await uImage(url)
      const {width, height} = image
      this.map.set(key, {key, url, width, height, image})
    }
  }

  async import(file: File) {
    await this.fs.write(file.name, file)
    const key = file.name
    const url = URL.createObjectURL(file)
    const image = await uImage(url)
    const {width, height} = image
    this.map.set(key, {key, url, width, height, image})
  }

  get(key: string): Texture {
    const tx = this.map.get(key)
    if (tx === undefined) { // @ts-ignore
      return key.startsWith("#")
        ? {key: key, url: uColorToUrl(key), width: 1, height: 1}
        : {key: "ERROR", url: uColorToUrl("red"), width: 1, height: 1}
    }
    return tx
  }

}
