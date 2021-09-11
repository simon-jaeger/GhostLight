import {Cursor} from "/src/services/Cursor/Cursor"
import {CursorMode} from "/src/services/Cursor/CursorMode"
import {App} from "/src/services/App"
import {Selection} from "/src/services/Selection"

export class CursorModeMove implements CursorMode {
  initialPositions!: Point[]

  onEnter() {
    this.initialPositions = Selection.all.map((a) => ({
      x: a.shape.x,
      y: a.shape.y,
    }))
  }

  onMouseMove() {
    Selection.all.forEach((a, i) => {
      a.shape.x = this.initialPositions[i].x + (Cursor.pos.x - Cursor.posStart.x)
      a.shape.y = this.initialPositions[i].y + (Cursor.pos.y - Cursor.posStart.y)
    })
  }

  onMouseUp() {
    App.setMode("select")
  }

}
