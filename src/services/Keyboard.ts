import {makeAutoObservable} from "mobx"
import {Selection} from "/src/services/Selection"
import {Actor} from "/src/models/Actor"

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
      this["on" + e.key]?.()
    })
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key in this) this[e.key] = false
    })
  }

  onDelete() {
    Actor.destroy(Selection.all)
    Selection.clear()
  }
}
