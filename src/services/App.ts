import {makeAutoObservable} from "mobx"

export type AppMode = "select" | "create" | "move" | "resize"

export const App = new class {
  private _mode: AppMode = "select"
  private _previousMode = this._mode
  private _subMode = ""

  constructor() {
    makeAutoObservable(this)
  }

  get mode() {
    return this._mode
  }

  setMode(newMode: AppMode, subMode = "") {
    this._previousMode = this._mode
    this._mode = newMode
    this._subMode = subMode
  }

  get previousMode() {
    return this._previousMode
  }

  get subMode() {
    return this._subMode
  }
}
