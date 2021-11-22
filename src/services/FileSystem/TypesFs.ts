import {FileSystem} from "/src/services/FileSystem/FileSystem"
import {Type} from "/src/models/Type"
import {IReactionDisposer, reaction, toJS} from "mobx"
import {uDebounce} from "/src/helpers/utils"

export const TypesFs = new class {
  private fs!: FileSystem
  private readonly filename = "types.json"
  private autoSaveDisposer: IReactionDisposer | null = null

  async setup(dirHandle: FileSystemDirectoryHandle) {
    Type.destroy(...Type.all)
    this.fs = await FileSystem.make(dirHandle)
    if (!this.fs.filenames.has(this.filename)) await this.save() // create file if necessary
    const json = await this.fs.read(this.filename)
    this.load(json)

    if (!this.autoSaveDisposer)
    this.autoSaveDisposer = reaction(() => toJS(Type.all), uDebounce(() => {
      this.save()
    }, 1000))
  }

  load(json:string) {
    Type.createMany(JSON.parse(json))
    Type.active.value = Type.all.length ? Type.all[0] : new Type()
  }

  async save() {
    await this.fs.write(this.filename, JSON.stringify(Type.all, null, 2))
  }
}
