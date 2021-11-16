import {makeAutoObservable} from "mobx"
import {Selection} from "/src/services/Selection"
import {Actor} from "/src/models/Actor"
import {App} from "/src/services/App"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Camera} from "/src/services/Camera"
import {Clipboard} from "/src/services/Clipboard"
import {History} from "/src/services/History"

export const Keyboard = new class {
  Shift = false
  Alt = false
  Ctrl = false

  private nameMap = {
    " ": "Space",
    "+": "Plus",
    "-": "Minus",
    "a": "A",
    "c": "C",
    "v": "V",
    "x": "X",
    "y": "Y",
    "z": "Z",
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
      this["on" + (this.Ctrl ? "Ctrl" : "") + key + "Up"]?.(e)
    })
  }

  onCtrlC() {
    Clipboard.copy(...Selection.all)
  }
  onCtrlX() {
    Clipboard.cut(...Selection.all)
    Selection.clear()
  }
  async onCtrlV() {
    const pasted = await Clipboard.paste()
    if (pasted) Selection.set(...pasted)
  }

  onCtrlZ() {
    History.undo()
  }
  onCtrlY() {
    History.redo()
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
    Camera.zoomIn()
  }
  onMinus() {
    Camera.zoomOut()
  }

  onCtrlA(e: KeyboardEvent) {
    e.preventDefault()
    App.setMode("select")
    Selection.set(...Actor.all)
  }
}
