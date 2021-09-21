import __definitions__ from "wicg-file-system-access"
import {Actor} from "/src/models/Actor"
import {Selection} from "/src/services/Selection"

export const FileSystem = new class {
  dirHandle!: FileSystemDirectoryHandle
  fileHandle!: FileSystemFileHandle

  async open() {
    this.dirHandle = await showDirectoryPicker()
    this.fileHandle = await this.dirHandle.getFileHandle("scene.json", {create: true})
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
