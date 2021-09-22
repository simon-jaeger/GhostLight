import __definitions__ from "wicg-file-system-access"
import {Actor} from "/src/models/Actor"
import {Selection} from "/src/services/Selection"
import {Textures} from "/src/services/Textures"

export const FileSystem = new class {
  readonly rootMark = ".ghostlight"
  readonly sceneFile = "scene.json"
  readonly textureDir = "textures"

  dirHandle!: FileSystemDirectoryHandle
  fileHandle!: FileSystemFileHandle

  async open() {
    this.dirHandle = await showDirectoryPicker()
    try {
      await this.dirHandle.getDirectoryHandle(this.rootMark)
    } catch {
      alert(`Not a GhostLight directory, missing [${this.rootMark}]`)
      return
    }

    await Textures.register(await FileSystem.dirHandle.getDirectoryHandle(this.textureDir))
    this.fileHandle = await this.dirHandle.getFileHandle(this.sceneFile, {create: true})
    const scene = JSON.parse(await this.fileHandle.getFile().then(x => x.text()))
    this.parse(scene)
    console.log("opened")
  }

  async save() {
    const stream = await this.fileHandle.createWritable()
    await stream.write(this.serialize())
    await stream.close()
    console.log("saved")
  }

  private serialize() {
    const scene = {
      actors: Actor.all,
    }
    return JSON.stringify(scene, null, 2)
  }

  private parse(scene) {
    Selection.clear()
    Actor.destroy(...Actor.all)
    Actor.createMany(scene.actors)
  }

}
