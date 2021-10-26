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
      const actors = Selection.all
      const length = actors.length
      for (let i = 0; i < length; i++) {
        const a = actors[i]
        const initialPos = this.initialPositions[i]
        a.x = initialPos.x + Cursor.movedX
        a.y = initialPos.y + Cursor.movedY
      }
    })()
  }

  onMouseUp() {
    App.revertMode()
  }

}
