import {observable, ObservableSet} from "mobx"

export class FileSystem {
  private dirHandle!: FileSystemDirectoryHandle
  readonly filenames: ObservableSet<string> = observable(new Set<string>())

  static async make(dirHandle: FileSystemDirectoryHandle) {
    const fs = new FileSystem()
    fs.dirHandle = dirHandle
    for await (const fileHandle of dirHandle.values()) fs.filenames.add(fileHandle.name)
    return fs
  }

  async readRaw(filename: string) {
    return await this.dirHandle.getFileHandle(filename).then((x) => x.getFile())
  }

  async read(filename: string) {
    return this.readRaw(filename).then((x) => x.text())
  }

  async write(filename: string, content: string) {
    const handle = await this.dirHandle.getFileHandle(filename, {create: true})
    const stream = await handle.createWritable()
    await stream.write(content)
    await stream.close()
    this.filenames.add(filename)
  }

  async destroy(filename: string) {
    await this.dirHandle.removeEntry(filename)
    this.filenames.delete(filename)
  }

  async copy(filename: string, copyFilename: string) {
    await this.write(copyFilename, await this.read(filename))
  }

  async rename(filename: string, newFilename: string) {
    await this.copy(filename, newFilename)
    await this.destroy(filename)
  }
}
