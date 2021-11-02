import {autorun, observable, reaction, toJS} from "mobx"
import {SceneFs} from "/src/services/FileSystem/SceneFs"
import {uLast} from "/src/helpers/utils"
import {Cursor} from "/src/services/Cursor/Cursor"

export const History = new class {
  readonly undoStack: string[] = observable([])
  readonly redoStack: string[] = observable([])
  private paused = false

  listen() {
    reaction(() => toJS(SceneFs.data), () => {
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
    const snap = JSON.stringify(SceneFs.data)
    if (snap === uLast(this.undoStack)) return
    this.redoStack.length = 0 // clear redo on new change
    this.undoStack.push(snap)
  }

  undo() {
    if (this.undoStack.length <= 1) return
    this.paused = true
    this.redoStack.push(this.undoStack.pop()!)
    SceneFs.load(uLast(this.undoStack))
    setTimeout(() => this.paused = false)
  }

  redo() {
    if (this.redoStack.length <= 0) return
    this.paused = true
    this.undoStack.push(this.redoStack.pop()!)
    SceneFs.load(uLast(this.undoStack))
    setTimeout(() => this.paused = false)
  }

  // reset history and start with given scene data
  reset(json: string) {
    this.undoStack.length = 0
    this.redoStack.length = 0
    this.undoStack.push(json)
  }
}
