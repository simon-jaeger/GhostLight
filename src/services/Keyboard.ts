import {makeAutoObservable} from "mobx"
import {Selection} from "/src/services/Selection"
import {Actor} from "/src/models/Actor"
import {App} from "/src/services/App"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Camera} from "/src/models/Camera"

export const Keyboard = new class {
  Shift = false
  Alt = false
  Ctrl = false

  private nameMap = {
    " ": "Space",
    "+": "Plus",
    "-": "Minus",
    "a": "A",
    "Control": "Ctrl",
  }

  constructor() {
    makeAutoObservable(this)
  }

  addEventListeners() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      let key = this.nameMap[e.key] ?? e.key
      if (key in this) this[key] = true
      this["on" + (this.Ctrl ? "Ctrl" : "") + key]?.(e)
    })
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      let key = this.nameMap[e.key] ?? e.key
      if (key in this) this[key] = false
      this["on" + key + "Up"]?.(e)
    })
  }

  onDelete() {
    Actor.destroy(...Selection.all)
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

  onPlus() {
    Camera.zoom *= 2
  }
  onMinus() {
    Camera.zoom /= 2
  }

  onCtrlA(e: KeyboardEvent) {
    e.preventDefault()
    Selection.set(...Actor.all)
  }
}
