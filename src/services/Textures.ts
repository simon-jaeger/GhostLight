// TODO: register manually imported textures
// TODO: periodic polling for changes?

import {makeAutoObservable} from "mobx"
import {uImage} from "/src/helpers/utils"

type Texture = {
  key: string,
  src: string,
  width: number,
  height: number,
}

export const Textures = new class {
  map = new Map<string, Texture>()
  active: Texture = {key: "", src: "", width: 0, height: 0}

  constructor() {
    makeAutoObservable(this)
  }

  private clear() {
    this.map.forEach(x => URL.revokeObjectURL(x.src))
    this.map.clear()
  }

  async register(dirHandle: FileSystemDirectoryHandle) {
    this.clear()
    for await (const fileHandle of dirHandle.values()) {
      if (fileHandle instanceof FileSystemDirectoryHandle) continue
      const tx = await uImage(URL.createObjectURL(await fileHandle.getFile()))
      this.map.set(fileHandle.name, {
          key: fileHandle.name,
          src: tx.src,
          width: tx.width,
          height: tx.height,
        },
      )
    }
  }

  get(key: string) {
    let tx = this.map.get(key)
    if (tx === undefined) tx = {key: "", src: "", width: 0, height: 0}
    return tx
  }

  get all() {
    return Array.from(this.map.values())
  }

}
