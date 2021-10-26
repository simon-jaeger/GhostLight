import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Selection} from "/src/services/Selection"
import {App} from "/src/services/App"
import {Actor} from "/src/models/Actor"
import {uCollision} from "/src/helpers/utils"

// TODO: more ux (shift to add to selection etc.)
export class CursorModeDragSelect implements CursorMode {
  anchor: Point = {x: 0, y: 0}

  onEnter() {
    this.anchor = {...Cursor.posReal}
    Selection.shape = {
      ...this.anchor,
      width: 0,
      height: 0,
    }
  }

  onMouseMove() {
    if (Cursor.inertia) return
    Selection.shape.width = Math.abs(this.anchor.x - Cursor.posReal.x)
    Selection.shape.height = Math.abs(this.anchor.y - Cursor.posReal.y)
    Selection.shape.x = this.anchor.x - (Cursor.posReal.x < this.anchor.x ? Selection.shape.width : 0)
    Selection.shape.y = this.anchor.y - (Cursor.posReal.y < this.anchor.y ? Selection.shape.height : 0)
  }

  onMouseUp(e: MouseEvent) {
    Selection.set(...Actor.all.filter((x) => uCollision(x.shape, Selection.shape)))
    App.revertMode()
  }

}
