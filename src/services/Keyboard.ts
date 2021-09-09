import {makeAutoObservable} from "mobx"

export const Keyboard = new class {
  Shift = false
  Alt = false
  Control = false

  constructor() {
    makeAutoObservable(this)
  }

  addEventListeners() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key in this) this[e.key] = true
    })
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key in this) this[e.key] = false
    })
  }
}
