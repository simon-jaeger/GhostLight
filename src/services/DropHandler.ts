import {makeAutoObservable} from "mobx"
import {AssetsFs} from "/src/services/FileSystem/AssetsFs"
import {Type} from "/src/models/Type"

// TODO: refactor to support new type system
export const DropHandler = new class {
  constructor() {
    makeAutoObservable(this)
  }

  addEventListener() {
    window.addEventListener("drop", this.onDrop)
    window.addEventListener("dragover", this.onDragOver)
  }

  async onDrop(e: DragEvent) {
    e.preventDefault()
    const files = [...e.dataTransfer!.files].filter((x) => x.type.startsWith("image"))
    files.sort((a, b) => a.name.localeCompare(b.name))
    for (const file of files) {
      const image = AssetsFs.has(file.name) ? AssetsFs.get(file.name) : await AssetsFs.import(file)
      Type.create({
        texture: file.name,
        name: file.name.replace(/\..+/, ""),
        width: image.width,
        height: image.height,
      })
    }
    // Type.active.value = Type.create()
  }

  onDragOver(e: DragEvent) {
    e.preventDefault()
  }
}
