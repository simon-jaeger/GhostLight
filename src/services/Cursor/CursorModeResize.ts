import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {App} from "/src/services/App"
import {Selection} from "/src/services/Selection"

// TODO: resize with other anchors too, currently only for bottom right anchor
// TODO: optional aspec ratio lock (shift / fixed ratio sprites)

export class CursorModeResize implements CursorMode {
  target!: Actor
  initialShape!: Shape

  onEnter() {
    this.target = Selection.all[0]
    this.initialShape = {...this.target.shape}

    // position cursor right at the actor's corner
    Cursor.down = true
    Cursor.pos.x = Cursor.posStart.x = this.target.shape.x + this.target.shape.width - 1
    Cursor.pos.y = Cursor.posStart.y = this.target.shape.y + this.target.shape.height - 1
  }

  onMouseMove() {
    this.target.shape.width = this.initialShape.width + (Cursor.pos.x - Cursor.posStart.x)
    this.target.shape.height = this.initialShape.height + (Cursor.pos.y - Cursor.posStart.y)
  }

  onMouseUp() {
    App.mode = "select"
  }

}
