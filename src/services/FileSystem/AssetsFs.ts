import {makeAutoObservable} from "mobx"
import {uImage} from "/src/helpers/utils"
import {FileSystem} from "/src/services/FileSystem/FileSystem"
import {ProjectFs} from "/src/services/FileSystem/ProjectFs"

export const AssetsFs = new class {
  private fs!: FileSystem
  private map: Map<string, HTMLImageElement> = new Map()
  private timestampsModified: Map<string, number> = new Map()
  private refreshIntervalId = 0

  constructor() {
    makeAutoObservable(this)
  }

  async setup(dirHandle: FileSystemDirectoryHandle) {
    clearInterval(this.refreshIntervalId)
    this.map.forEach(x => URL.revokeObjectURL(x.src))
    this.map.clear()
    this.timestampsModified.clear()

    this.fs = await FileSystem.make(dirHandle)
    for (const filename of this.fs.filenames) {
      const key = filename
      const file = await this.fs.readRaw(filename)
      const url = URL.createObjectURL(file)
      const image = await uImage(url)
      this.map.set(key, image)
      this.timestampsModified.set(key, file.lastModified)
    }

    this.refreshIntervalId = window.setInterval(() => this.refresh(), 2000)
  }

  async import(file: File) {
    if (!this.fs.filenames.has(file.name)) await this.fs.write(file.name, file)
    const key = file.name
    const url = URL.createObjectURL(file)
    const image = await uImage(url)
    this.map.set(key, image)
    this.timestampsModified.set(key, file.lastModified)
    return image
  }

  async refresh() {
    if (!ProjectFs.isOpen || document.hasFocus() || document.hidden) return
    for (const [key, image] of this.map.entries()) {
      const file = await this.fs.readRaw(key)
      if (file.lastModified === this.timestampsModified.get(key)) continue
      const url = URL.createObjectURL(file)
      const freshImage = await uImage(url)
      this.map.set(key, freshImage)
      URL.revokeObjectURL(image.src)
      this.timestampsModified.set(key, file.lastModified)
    }
  }

  get(key: string) {
    const image = this.map.get(key)
    if (image === undefined) return new Image()
    else return image
  }

  has(key: string) {
    return this.map.has(key)
  }

}
