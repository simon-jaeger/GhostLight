import {makeAutoObservable} from "mobx"

export type AppMode = "select" | "create" | "move" | "resize"

export const App = new class {
  private _mode: AppMode = "select"
  private _previousMode = this._mode

  constructor() {
    makeAutoObservable(this)
  }

  get mode() {
    return this._mode
  }

  set mode(newMode: AppMode) {
    this._previousMode = this._mode
    this._mode = newMode
  }

  get previousMode() {
    return this._previousMode
  }
}
