import {Cursor} from "/src/services/Cursor/Cursor"
import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Camera} from "/src/services/Camera"

export class CursorModePan implements CursorMode {
  cameraStart: Point = {x: 0, y: 0}
  mouseStart: Point = {x: 0, y: 0}

  onEnter() {
    document.body.style.cursor = "grab"
  }
  onLeave() {
    document.body.style.cursor = ""
  }

  onMouseDown(e: MouseEvent) {
    this.cameraStart = {x: Camera.x, y: Camera.y}
    this.mouseStart = {x: e.x, y: e.y}
  }

  onMouseMove(e: MouseEvent) {
    if (!Cursor.down) return
    Camera.x = this.cameraStart.x + (e.x - this.mouseStart.x)
    Camera.y = this.cameraStart.y + (e.y - this.mouseStart.y)
  }
}
