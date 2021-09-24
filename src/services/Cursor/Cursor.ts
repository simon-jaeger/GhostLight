import {makeAutoObservable, reaction} from "mobx"
import {CursorMode} from "/src/services/Cursor/CursorMode"
import {App, AppMode} from "/src/services/App"
import {Keyboard} from "/src/services/Keyboard"
import {CursorModeCreate} from "/src/services/Cursor/CursorModeCreate"
import {CursorModeSelect} from "/src/services/Cursor/CursorModeSelect"
import {CursorModeMove} from "/src/services/Cursor/CursorModeMove"
import {CursorModeResize} from "/src/services/Cursor/CursorModeResize"
import {uSnap} from "/src/helpers/utils"
import {Grid} from "/src/services/Grid"
import {CursorInertia} from "/src/services/Cursor/CursorInertia"
import {CursorModePan} from "/src/services/Cursor/CursorModePan"
import {Camera} from "/src/services/Camera"

export const Cursor = new class {
  pos: Point = {x: 0, y: 0}
  posStart: Point = {x: 0, y: 0}
  posReal: Point = {x: 0, y: 0}
  down = false
  private modes: { [key in AppMode]: CursorMode } = {
    select: new CursorModeSelect(),
    create: new CursorModeCreate(),
    move: new CursorModeMove(),
    resize: new CursorModeResize(),
    pan: new CursorModePan(),
  }
  private currentMode = this.modes.select
  private cursorInertia = new CursorInertia()

  constructor() {
    makeAutoObservable(this)
    reaction(() => App.mode, (mode) => {
      this.currentMode.onLeave?.()
      this.currentMode = this.modes[mode]
      this.currentMode.onEnter?.()
    }, {fireImmediately: true})
    reaction(() => App.subMode, () => {
      this.currentMode.onLeave?.()
      this.currentMode.onEnter?.()
    }, {fireImmediately: true})
  }

  get movedX() {
    return this.pos.x - this.posStart.x
  }
  get movedY() {
    return this.pos.y - this.posStart.y
  }
  get inertia() {
    return this.cursorInertia.active
  }

  addEventListeners(sceneView: HTMLDivElement) {
    this.cursorInertia.addEventListeners()
    sceneView.addEventListener("mousedown", (e) => {
      Keyboard.Shift = e.shiftKey
      Keyboard.Alt = e.altKey
      Keyboard.Ctrl = e.ctrlKey

      this.down = true
      this.posStart.x = this.pos.x
      this.posStart.y = this.pos.y

      this.currentMode.onMouseDown?.(e)
    })
    sceneView.addEventListener("mousemove", (e) => {
      this.posReal.x = e.offsetX / Camera.zoom
      this.posReal.y = e.offsetY / Camera.zoom
      this.pos.x = uSnap(this.posReal.x, Grid.sizeX)
      this.pos.y = uSnap(this.posReal.y, Grid.sizeY)
      this.currentMode.onMouseMove?.(e)
    })
    sceneView.addEventListener("mouseup", (e) => {
      this.down = false
      this.currentMode.onMouseUp?.(e)
    })
  }

}
