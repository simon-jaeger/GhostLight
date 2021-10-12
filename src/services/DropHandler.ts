import {makeAutoObservable} from "mobx"
import {Textures} from "/src/services/FileSystem/Textures"

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
    files.forEach((file) => Textures.import(file))
  }

  onDragOver(e:DragEvent) {
    e.preventDefault()
  }
}
