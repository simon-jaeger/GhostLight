import {Cursor} from "/src/services/Cursor/Cursor"
import {CursorMode} from "/src/services/Cursor/CursorMode"
import {App} from "/src/services/App"
import {Selection} from "/src/services/Selection"
import {action} from "mobx"

export class CursorModeMove implements CursorMode {
  initialPositions!: Point[]

  onEnter() {
    this.initialPositions = Selection.all.map((a) => ({x: a.x, y: a.y}))
  }

  onMouseMove() {
    if (Cursor.inertia) return
    action(() => {
      const a = Selection.all
      const length = a.length
      for (let i = 0; i < length; i++) {
        a[i].x = this.initialPositions[i].x + Cursor.movedX
        a[i].y = this.initialPositions[i].y + Cursor.movedY
      }
    })()
  }

  onMouseUp() {
    App.revertMode()
  }

}
