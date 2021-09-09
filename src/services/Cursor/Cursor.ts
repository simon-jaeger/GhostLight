import {makeAutoObservable, reaction} from "mobx"
import {CursorMode} from "/src/services/Cursor/CursorMode"
import {App, AppMode} from "/src/services/App"
import {CursorModeCreate} from "/src/services/Cursor/CursorModeCreate"
import {CursorModeSelect} from "/src/services/Cursor/CursorModeSelect"
import {Keyboard} from "/src/services/Keyboard"

export const Cursor = new class {
  x = 0
  y = 0
  private modes: { [key in AppMode]: CursorMode } = {
    create: new CursorModeCreate(),
    select: new CursorModeSelect(),
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
    sceneView.addEventListener("mousemove", (e) => {
      this.x = e.offsetX
      this.y = e.offsetY
    })
    sceneView.addEventListener("mousedown", (e) => {
      Keyboard.Shift = e.shiftKey
      Keyboard.Alt = e.altKey
      Keyboard.Control = e.ctrlKey
      this.currentMode.onMouseDown?.()
    })
  }
}
