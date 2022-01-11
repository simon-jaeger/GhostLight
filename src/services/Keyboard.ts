import {makeAutoObservable} from "mobx"
import {Selection} from "/src/services/Selection"
import {Actor} from "/src/models/Actor"
import {App} from "/src/services/App"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Camera} from "/src/services/Camera"
import {Clipboard} from "/src/services/Clipboard"
import {History} from "/src/services/History"
import {uCapitalize, uThrottle} from "/src/helpers/utils"
import {Grid} from "/src/services/Grid"

export const Keyboard = new class {
  Shift = false
  Alt = false
  Ctrl = false

  private nameMap = {
    " ": "Space",
    "+": "Plus",
    "-": "Minus",
    "Control": "Ctrl",
  }

  constructor() {
    makeAutoObservable(this)
  }

  addEventListeners(sceneView: HTMLElement) {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      let key = this.nameMap[e.key] ?? uCapitalize(e.key)
      if (key in this) this[key] = true
      this["on" + (this.Ctrl ? "Ctrl" : "") + key]?.(e)
    })
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      let key = this.nameMap[e.key] ?? uCapitalize(e.key)
      if (key in this) this[key] = false
      this["on" + (this.Ctrl ? "Ctrl" : "") + key + "Up"]?.(e)
    })

    // alias middle mouse button to space
    sceneView.addEventListener("mousedown", (e: MouseEvent) => {
      if (e.button !== 0 && e.button !== 2) this.onSpace()
    }, {capture: true})
    sceneView.addEventListener("mouseup", (e: MouseEvent) => {
      if (e.button !== 0 && e.button !== 2) this.onSpaceUp()
    }, {capture: true})

    // alias scroll wheel to plus/minus
    sceneView.addEventListener("wheel", uThrottle((e: WheelEvent) => {
      if (e.deltaY > 0) this.onMinus()
      if (e.deltaY < 0) this.onPlus()
    }, 200), {passive: true})
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
    App.setMode("select")
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

  onArrowUp() {
    Selection.all.forEach((a) => a.y -= Grid.sizeY)
  }
  onArrowDown() {
    Selection.all.forEach((a) => a.y += Grid.sizeY)
  }
  onArrowLeft() {
    Selection.all.forEach((a) => a.x -= Grid.sizeX)
  }
  onArrowRight() {
    Selection.all.forEach((a) => a.x += Grid.sizeX)
  }
}
