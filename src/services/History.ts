import {autorun, observable, reaction, toJS} from "mobx"
import {uLast} from "/src/helpers/utils"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Selection} from "/src/services/Selection"
import {Actor} from "/src/models/Actor"

export const History = new class {
  readonly undoStack: string[] = observable([])
  readonly redoStack: string[] = observable([])
  private paused = false

  listen() {
    reaction(() => toJS(Actor.all), () => {
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
    const snap = JSON.stringify(Actor.all)
    if (snap === uLast(this.undoStack)) return
    this.redoStack.length = 0 // clear redo on new change
    this.undoStack.push(snap)
  }

  undo() {
    if (this.undoStack.length <= 1) return
    this.redoStack.push(this.undoStack.pop()!)
    this.restore()
  }

  redo() {
    if (this.redoStack.length <= 0) return
    this.undoStack.push(this.redoStack.pop()!)
    this.restore()
  }

  private restore() {
    this.paused = true
    const selectionIds = Selection.all.map((x) => x.id)
    Actor.destroy(...Actor.all)
    Actor.createMany(JSON.parse(uLast(this.undoStack)))

    const selectedActors = Actor.all.filter((x) => selectionIds.includes(x.id))
    Selection.set(...selectedActors)
    setTimeout(() => this.paused = false)
  }

  // reset history and start with given actor tree
  reset(actors: Actor[]) {
    this.undoStack.length = 0
    this.redoStack.length = 0
    this.undoStack.push(JSON.stringify(actors))
  }
}
