import {Cursor} from "/src/services/Cursor/Cursor"
import {CursorMode} from "/src/services/Cursor/CursorMode"
import {App} from "/src/services/App"
import {Selection} from "/src/services/Selection"

export class CursorModeMove implements CursorMode {
  initialPositions!: Point[]

  onEnter() {
    this.initialPositions = Selection.all.map((a) => ({x: a.x, y: a.y}))
  }

  onMouseMove() {
    Selection.all.forEach((a, i) => {
      a.x = this.initialPositions[i].x + Cursor.movedX
      a.y = this.initialPositions[i].y + Cursor.movedY
    })
  }

  onMouseUp() {
    App.revertMode()
  }

}
