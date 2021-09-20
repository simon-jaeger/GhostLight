import {makeAutoObservable} from "mobx"
import {Selection} from "/src/services/Selection"
import {Actor} from "/src/models/Actor"
import {App} from "/src/services/App"
import {Cursor} from "/src/services/Cursor/Cursor"

export const Keyboard = new class {
  Shift = false
  Alt = false
  Control = false

  private nameMap = {
    " ": "Space",
  }

  constructor() {
    makeAutoObservable(this)
  }

  addEventListeners() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      let key = this.nameMap[e.key] ?? e.key
      if (key in this) this[key] = true
      this["on" + key]?.()
    })
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      let key = this.nameMap[e.key] ?? e.key
      if (key in this) this[key] = false
      this["on" + key + "Up"]?.()
    })
  }

  onDelete() {
    Actor.destroy(Selection.all)
    Selection.clear()
  }

  onEscape() {
    Selection.clear()
  }

  onSpace() {
    if (!Cursor.down) App.setMode("pan")
  }
  onSpaceUp() {
    if (App.isMode("pan")) App.revertMode()
  }
}
