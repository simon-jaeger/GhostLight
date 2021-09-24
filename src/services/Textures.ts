// TODO: register manually imported textures
// TODO: periodic polling for changes?

import {makeAutoObservable} from "mobx"

export const Textures = new class {
  map = new Map()
  active = "#6B7280"

  constructor() {
    makeAutoObservable(this)
  }

  private clear() {
    this.map.forEach(x => URL.revokeObjectURL(x[1]))
    this.map.clear()
  }

  async register(dirHandle: FileSystemDirectoryHandle) {
    this.clear()
    for await (const fileHandle of dirHandle.values()) {
      if (fileHandle instanceof FileSystemDirectoryHandle) continue
      this.map.set(fileHandle.name, URL.createObjectURL(await fileHandle.getFile()))
    }
  }

  get(textureName: string) {
    return this.map.get(textureName)
  }

  get all() {
    return Array.from(this.map)
  }

}
