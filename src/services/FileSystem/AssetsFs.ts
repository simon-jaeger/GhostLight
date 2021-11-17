import {makeAutoObservable} from "mobx"
import {uImage} from "/src/helpers/utils"
import {FileSystem} from "/src/services/FileSystem/FileSystem"

export const AssetsFs = new class {
  private fs!: FileSystem
  map: Map<string, HTMLImageElement> = new Map()

  constructor() {
    makeAutoObservable(this)
  }

  get all() {
    return Array.from(this.map.values())
  }

  private clear() {
    this.map.forEach(x => URL.revokeObjectURL(x.src))
    this.map.clear()
  }

  async setup(dirHandle: FileSystemDirectoryHandle) {
    this.clear()
    this.fs = await FileSystem.make(dirHandle)
    for (const filename of this.fs.filenames) {
      const key = filename
      const url = URL.createObjectURL(await this.fs.readRaw(filename))
      const image = await uImage(url)
      this.map.set(key, image)
    }
  }

  async import(file: File) {
    await this.fs.write(file.name, file)
    const key = file.name
    const url = URL.createObjectURL(file)
    const image = await uImage(url)
    this.map.set(key, image)
    return image
  }

  get(key: string) {
    const image = this.map.get(key)
    if (image === undefined) return new Image()
    else return image
  }

}
