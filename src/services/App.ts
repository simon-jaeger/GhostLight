import {makeAutoObservable} from "mobx"

export type AppMode =
  "select"
  | "dragSelect"
  | "create"
  | "move"
  | "resize"
  | "pan"

export const App = new class {
  private _mode: AppMode = "select"
  private _subMode = ""
  private _previousMode = this._mode

  constructor() {
    makeAutoObservable(this)
  }

  get mode() {
    return this._mode
  }
  get subMode() {
    return this._subMode
  }

  setMode(newMode: AppMode, subMode = "") {
    if (newMode !== this._mode) this._previousMode = this._mode
    this._mode = newMode
    this._subMode = subMode
  }

  isMode(...modes: AppMode[]) {
    return modes.includes(this._mode)
  }

  revertMode() {
    this.setMode(this._previousMode)
  }
}
