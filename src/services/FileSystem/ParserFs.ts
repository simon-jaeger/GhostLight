import {FileSystem} from "/src/services/FileSystem/FileSystem"
import glParseTs from "/src/parser/glParse.ts?raw"

export const ParserFs = new class {
  private fs!: FileSystem

  async setup(dirHandle: FileSystemDirectoryHandle) {
    this.fs = await FileSystem.make(dirHandle)
    await this.fs.write('glParse.ts', glParseTs)
  }
}
