import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {App} from "/src/services/App"
import {Selection} from "/src/services/Selection"

export class CursorModeResize implements CursorMode {
  target!: Actor
  initialShape!: Shape

  onEnter() {
    this.target = Selection.all[0]
    this.initialShape = {...this.target.shape}

    // click cursor and set start positon at center of anchor
    Cursor.down = true
    if (App.subMode === "nw") {
      Cursor.posStart.x = this.target.shape.x
      Cursor.posStart.y = this.target.shape.y
    }
    if (App.subMode === "ne") {
      Cursor.posStart.x = this.target.shape.x + this.target.shape.width
      Cursor.posStart.y = this.target.shape.y
    }
    if (App.subMode === "se") {
      Cursor.posStart.x = this.target.shape.x + this.target.shape.width
      Cursor.posStart.y = this.target.shape.y + this.target.shape.height
    }
    if (App.subMode === "sw") {
      Cursor.posStart.x = this.target.shape.x
      Cursor.posStart.y = this.target.shape.y + this.target.shape.height
    }
  }

  onMouseMove() {
    if (App.subMode === "nw") {
      this.target.shape.x = Cursor.pos.x
      this.target.shape.y = Cursor.pos.y
      this.target.shape.width = this.initialShape.width - Cursor.movedX
      this.target.shape.height = this.initialShape.height - Cursor.movedY

      if (Cursor.pos.x > this.target.shape.x + this.target.shape.width) App.setMode("resize", "ne")
      if (Cursor.pos.y > this.target.shape.y + this.target.shape.height) App.setMode("resize", "sw")
    }
    if (App.subMode === "ne") {
      this.target.shape.y = Cursor.pos.y
      this.target.shape.width = this.initialShape.width + Cursor.movedX
      this.target.shape.height = this.initialShape.height - Cursor.movedY

      if (Cursor.pos.x < this.target.shape.x) App.setMode("resize", "nw")
      if (Cursor.pos.y > this.target.shape.y + this.target.shape.height) App.setMode("resize", "se")
    }
    if (App.subMode === "se") {
      this.target.shape.width = this.initialShape.width + Cursor.movedX
      this.target.shape.height = this.initialShape.height + Cursor.movedY

      if (Cursor.pos.x < this.target.shape.x) App.setMode("resize", "sw")
      if (Cursor.pos.y < this.target.shape.y) App.setMode("resize", "ne")
    }
    if (App.subMode === "sw") {
      this.target.shape.x = Cursor.pos.x
      this.target.shape.width = this.initialShape.width - Cursor.movedX
      this.target.shape.height = this.initialShape.height + Cursor.movedY

      if (Cursor.pos.x > this.target.shape.x + this.target.shape.width) App.setMode("resize", "se")
      if (Cursor.pos.y < this.target.shape.y) App.setMode("resize", "nw")
    }
  }

  onMouseUp() {
    App.setMode("select")
  }

}
