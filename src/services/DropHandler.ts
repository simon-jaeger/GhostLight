import {makeAutoObservable} from "mobx"
import {AssetsFs} from "/src/services/FileSystem/AssetsFs"

// TODO: refactor to support new type system
export const DropHandler = new class {
  constructor() {
    makeAutoObservable(this)
  }

  addEventListener() {
    window.addEventListener('drop', this.onDrop)
    window.addEventListener('dragover', this.onDragOver)
  }

  onDrop(e:DragEvent) {
    e.preventDefault()
    const files = [...e.dataTransfer!.files].filter((x) => x.type.startsWith('image'))
    files.forEach((file) => AssetsFs.import(file))
  }

  onDragOver(e:DragEvent) {
    e.preventDefault()
  }
}
