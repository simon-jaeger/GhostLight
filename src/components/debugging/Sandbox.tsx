import React from "react"
import {observer} from "mobx-react-lite"
import {makeAutoObservable} from "mobx"

const state = makeAutoObservable(new class {
  handle: FileSystemFileHandle | null = null
  file: File | null = null
  text = ""

  async read() {
    console.log('read')
    this.handle = this.handle ?? (await showOpenFilePicker())[0]
    this.file = await this.handle.getFile()
    this.text = await this.file.text()
  }

  async refresh() {
    console.log('check...')
    if (!this.handle) return
    const lastModified = (await this.handle.getFile()).lastModified
    if (lastModified !== this.file?.lastModified) await this.read()
  }
})

setInterval(() => state.refresh(),1000)

export const Sandbox = observer(() => {
  return (
    <div className="absolute inset-0 p-4 bg-gray-800">
      <button onClick={() => state.read()}>open</button>
      <pre>{state.text}</pre>
    </div>
  )
})

Sandbox.displayName = nameof(Sandbox)
