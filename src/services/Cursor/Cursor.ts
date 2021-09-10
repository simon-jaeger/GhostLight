import {makeAutoObservable, reaction} from "mobx"
import {CursorMode} from "/src/services/Cursor/CursorMode"
import {App, AppMode} from "/src/services/App"
import {Keyboard} from "/src/services/Keyboard"
import {CursorModeCreate} from "/src/services/Cursor/CursorModeCreate"
import {CursorModeSelect} from "/src/services/Cursor/CursorModeSelect"
import {CursorModeMove} from "/src/services/Cursor/CursorModeMove"

export const Cursor = new class {
  pos: Point = {x: 0, y: 0}
  posStart: Point = {x: 0, y: 0}
  down = false
  private modes: { [key in AppMode]: CursorMode } = {
    create: new CursorModeCreate(),
    select: new CursorModeSelect(),
    move: new CursorModeMove(),
  }
  private currentMode!: CursorMode

  constructor() {
    makeAutoObservable(this)
    reaction(() => App.mode, (mode) => {
      this.currentMode = this.modes[mode]
      this.currentMode.onEnter?.()
    }, {fireImmediately: true})
  }

  addEventListeners(sceneView: HTMLDivElement) {
    sceneView.addEventListener("mousedown", (e) => {
      Keyboard.Shift = e.shiftKey
      Keyboard.Alt = e.altKey
      Keyboard.Control = e.ctrlKey

      this.down = true
      this.posStart.x = e.offsetX
      this.posStart.y = e.offsetY

      this.currentMode.onMouseDown?.()
    })
    sceneView.addEventListener("mousemove", (e) => {
      this.pos.x = e.offsetX
      this.pos.y = e.offsetY
      this.currentMode.onMouseMove?.()
    })
    sceneView.addEventListener("mouseup", (e) => {
      this.down = false
      this.currentMode.onMouseUp?.()
    })
  }

  // check if Cursor moved beyond inertia threshold
  inertia() {
    const threshold = 8
    return (Math.abs(Cursor.pos.x - Cursor.posStart.x) + Math.abs(Cursor.pos.y - Cursor.posStart.y)) < threshold
  }
}
