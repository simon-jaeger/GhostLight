// TODO: register manually imported textures
// TODO: periodic polling for changes?

import {makeAutoObservable} from "mobx"
import {uColorToUrl, uImage} from "/src/helpers/utils"

type Texture = { key: string, url: string, width: number, height: number }

export const Textures = new class {
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

  async load(directory: FileSystemDirectoryHandle) {
    this.clear()
    for await (const file of directory.values()) {
      if (file.kind === "directory") continue
      const key = file.name
      const url = URL.createObjectURL(await file.getFile())
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
