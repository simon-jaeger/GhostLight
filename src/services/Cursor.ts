import {makeAutoObservable} from "mobx"
import {Actor} from "/src/models/Actor"

export const Cursor = new class {
  x = 0
  y = 0

  constructor() {
    makeAutoObservable(this)
  }

  addEventListeners(sceneView: HTMLDivElement) {
    sceneView.addEventListener("mousemove", (e) => {
      this.x = e.offsetX
      this.y = e.offsetY
    })
    sceneView.addEventListener("mousedown", () => this.onMouseDown())
  }

  onMouseDown() {
    Actor.create({
      shape: {x: this.x, y: this.y, width: 50, height: 50},
      texture: "#888",
    })
  }

}
