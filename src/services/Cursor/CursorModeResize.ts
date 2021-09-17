import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {App} from "/src/services/App"
import {Selection} from "/src/services/Selection"
import {clone} from "/src/helpers/utils"

// TODO: maybe side anchors too?

export class CursorModeResize implements CursorMode {
  target!: Actor
  initial!: Actor

  onEnter() {
    this.target = Selection.all[0]
    this.initial = clone(this.target)

    // click cursor and set start positon at center of anchor
    ////////////////////////////////////////////////////////////////////////////
    Cursor.down = true
    if (App.subMode === "nw") {
      Cursor.posStart.x = this.target.x
      Cursor.posStart.y = this.target.y
    }
    ////////////////////////////////////////////////////////////////////////////
    else if (App.subMode === "ne") {
      Cursor.posStart.x = this.target.xw - 1
      Cursor.posStart.y = this.target.y
    }
    ////////////////////////////////////////////////////////////////////////////
    else if (App.subMode === "se") {
      Cursor.posStart.x = this.target.xw - 1
      Cursor.posStart.y = this.target.yh - 1
    }
    ////////////////////////////////////////////////////////////////////////////
    else if (App.subMode === "sw") {
      Cursor.posStart.x = this.target.x
      Cursor.posStart.y = this.target.yh - 1
    }
    ////////////////////////////////////////////////////////////////////////////
  }

  onMouseMove() {
    ////////////////////////////////////////////////////////////////////////////
    if (App.subMode === "nw") {
      this.target.x = Cursor.pos.x
      this.target.y = Cursor.pos.y
      this.target.w = this.initial.w - Cursor.movedX
      this.target.h = this.initial.h - Cursor.movedY

      if (Cursor.pos.x >= this.target.xw) {
        this.target.x = this.initial.xw
        return App.setMode("resize", "ne")
      }
      if (Cursor.pos.y >= this.target.yh) {
        this.target.y = this.initial.yh
        return App.setMode("resize", "sw")
      }
    }
    ////////////////////////////////////////////////////////////////////////////
    else if (App.subMode === "ne") {
      this.target.y = Cursor.pos.y
      this.target.w = this.initial.w + Cursor.movedX
      this.target.h = this.initial.h - Cursor.movedY

      if (Cursor.pos.x < this.target.x) {
        this.target.w = 0
        return App.setMode("resize", "nw")
      }
      if (Cursor.pos.y >= this.target.yh) {
        this.target.y = this.initial.yh
        return App.setMode("resize", "se")
      }
    }
    ////////////////////////////////////////////////////////////////////////////
    else if (App.subMode === "se") {
      this.target.w = this.initial.w + Cursor.movedX
      this.target.h = this.initial.h + Cursor.movedY

      if (Cursor.pos.x < this.target.x) {
        this.target.w = 0
        return App.setMode("resize", "sw")
      }
      if (Cursor.pos.y < this.target.y) {
        this.target.h = 0
        return App.setMode("resize", "ne")
      }
    }
    ////////////////////////////////////////////////////////////////////////////
    else if (App.subMode === "sw") {
      this.target.x = Cursor.pos.x
      this.target.w = this.initial.w - Cursor.movedX
      this.target.h = this.initial.h + Cursor.movedY

      if (Cursor.pos.x >= this.target.xw) {
        this.target.x = this.initial.xw
        return App.setMode("resize", "se")
      }

      if (Cursor.pos.y < this.target.y) {
        this.target.h = 0
        return App.setMode("resize", "nw")
      }
    }
    ////////////////////////////////////////////////////////////////////////////
  }

  onMouseUp() {
    // prevent "invisible" actor of zero w/h
    this.target.w = this.target.w <= 0 ? 1 : this.target.w
    this.target.h = this.target.h <= 0 ? 1 : this.target.h
    App.setMode("select")
  }
}
