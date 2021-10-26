import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Selection} from "/src/services/Selection"
import {App} from "/src/services/App"
import {Actor} from "/src/models/Actor"
import {uCollision} from "/src/helpers/utils"

export class CursorModeDragSelect implements CursorMode {
  anchor: Point = {x: 0, y: 0}

  onEnter() {
    this.anchor = {...Cursor.posReal}
    Selection.rect = {
      ...this.anchor,
      width: 0,
      height: 0,
    }
  }

  onMouseMove() {
    if (Cursor.inertia) return
    Selection.rect.width = Math.abs(this.anchor.x - Cursor.posReal.x)
    Selection.rect.height = Math.abs(this.anchor.y - Cursor.posReal.y)
    Selection.rect.x = this.anchor.x - (Cursor.posReal.x < this.anchor.x ? Selection.rect.width : 0)
    Selection.rect.y = this.anchor.y - (Cursor.posReal.y < this.anchor.y ? Selection.rect.height : 0)
  }

  onMouseUp(e: MouseEvent) {
    Selection.toggle(...Actor.all.filter((x) => uCollision(x.shape, Selection.rect)))
    App.revertMode()
  }

}
