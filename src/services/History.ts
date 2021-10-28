import {autorun, observable, reaction, toJS} from "mobx"
import {Scene} from "/src/services/FileSystem/Scene"
import {uLast} from "/src/helpers/utils"
import {Cursor} from "/src/services/Cursor/Cursor"

export const History = new class {
  readonly undoStack: string[] = observable([])
  readonly redoStack: string[] = observable([])
  private paused = false

  listen() {
    reaction(() => toJS(Scene.data), () => {
      if (!Cursor.down) this.snap()
    })
    reaction(() => Cursor.down, () => {
      if (!Cursor.down) this.snap()
    })
    autorun(() => {
      if (this.undoStack.length > 48) this.undoStack.shift()
    })
  }

  private snap() {
    if (this.paused) return
    const snap = JSON.stringify(Scene.data)
    if (snap === uLast(this.undoStack)) return
    this.redoStack.length = 0 // clear redo on new change
    this.undoStack.push(snap)
  }

  undo() {
    if (this.undoStack.length <= 1) return
    this.paused = true
    this.redoStack.push(this.undoStack.pop()!)
    Scene.load(uLast(this.undoStack))
    setTimeout(() => this.paused = false)
  }

  redo() {
    if (this.redoStack.length <= 0) return
    this.paused = true
    this.undoStack.push(this.redoStack.pop()!)
    Scene.load(uLast(this.undoStack))
    setTimeout(() => this.paused = false)
  }

  // reset history and start with given scene data
  reset(json: string) {
    this.undoStack.length = 0
    this.redoStack.length = 0
    this.undoStack.push(json)
  }
}
