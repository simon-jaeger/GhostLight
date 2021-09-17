import {makeAutoObservable, reaction} from "mobx"
import {CursorMode} from "/src/services/Cursor/CursorMode"
import {App, AppMode} from "/src/services/App"
import {Keyboard} from "/src/services/Keyboard"
import {CursorModeCreate} from "/src/services/Cursor/CursorModeCreate"
import {CursorModeSelect} from "/src/services/Cursor/CursorModeSelect"
import {CursorModeMove} from "/src/services/Cursor/CursorModeMove"
import {CursorModeResize} from "/src/services/Cursor/CursorModeResize"

export const Cursor = new class {
  pos: Point = {x: 0, y: 0}
  posStart: Point = {x: 0, y: 0}
  down = false
  private modes: { [key in AppMode]: CursorMode } = {
    create: new CursorModeCreate(),
    select: new CursorModeSelect(),
    move: new CursorModeMove(),
    resize: new CursorModeResize(),
  }
  private currentMode!: CursorMode

  constructor() {
    makeAutoObservable(this)
    reaction(() => App.mode, (mode) => {
      this.currentMode = this.modes[mode]
      this.currentMode.onEnter?.()
    }, {fireImmediately: true})
    reaction(() => App.subMode, () => {
      this.currentMode.onEnter?.()
    }, {fireImmediately: true})
  }

  get movedX() {
    return this.pos.x - this.posStart.x
  }

  get movedY() {
    return this.pos.y - this.posStart.y
  }

  addEventListeners(sceneView: HTMLDivElement) {
    sceneView.addEventListener("mousedown", (e) => {
      Keyboard.Shift = e.shiftKey
      Keyboard.Alt = e.altKey
      Keyboard.Control = e.ctrlKey

      this.down = true
      this.posStart.x = this.pos.x
      this.posStart.y = this.pos.y

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

}
