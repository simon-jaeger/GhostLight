// TODO: register imported textures
// TODO: periodic polling for changes?

export const Textures = new class {
  map = new Map()

  async register(dirHandle: FileSystemDirectoryHandle) {
    for await (const fileHandle of dirHandle.values()) {
      if (fileHandle instanceof FileSystemDirectoryHandle) continue
      this.map.set(fileHandle.name, URL.createObjectURL(await fileHandle.getFile()))
    }
  }

  get(textureName: string) {
    return this.map.get(textureName)
  }

}
