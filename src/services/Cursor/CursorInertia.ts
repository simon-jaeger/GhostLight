import {makeAutoObservable} from "mobx"

export class CursorInertia {
  active = true
  private posStart: Point = {x: 0, y: 0}
  private threshold = 8

  constructor() {
    makeAutoObservable(this)
  }

  addEventListeners() {
    window.addEventListener("mousedown", (e) => {
      this.posStart = {x: e.x, y: e.y}
    })
    window.addEventListener("mousemove", (e) => {
      if (!e.buttons) return
      const movedX = Math.abs(this.posStart.x - e.x)
      const movedY = Math.abs(this.posStart.y - e.y)
      const moved = Math.hypot(movedX, movedY)
      if (moved > this.threshold) this.active = false
    })
    window.addEventListener("mouseup", (e) => {
      this.active = true
    })
  }
}
