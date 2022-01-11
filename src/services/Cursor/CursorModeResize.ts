import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {App} from "/src/services/App"
import {Selection} from "/src/services/Selection"
import {uClone} from "/src/helpers/utils"
import {Grid} from "/src/services/Grid"
import {when} from "mobx"

export class CursorModeResize implements CursorMode {
  target!: Actor
  initial!: Actor

  onEnter() {
    this.target = Selection.all[0]
    this.initial = uClone(this.target)
    Cursor.down = true

    ////////////////////////////////////////////////////////////////////////////
    if (App.subMode === "") {
      let subMode = "se"
      when(() => Cursor.pos.x < this.initial.x || Cursor.pos.x >= this.initial.xw, () => {
          if (!App.isMode("resize")) return
          if (Cursor.movedX < 0) subMode = subMode.replace("e", "w")
          App.setMode("resize", subMode)
        },
      )
      when(() => Cursor.pos.y < this.initial.y || Cursor.pos.y >= this.initial.yh, () => {
          if (!App.isMode("resize")) return
          if (Cursor.movedY < 0) subMode = subMode.replace("s", "n")
          App.setMode("resize", subMode)
        },
      )
    }
    ////////////////////////////////////////////////////////////////////////////
    else if (App.subMode === "nw") {
      Cursor.posStart.x = this.target.x
      Cursor.posStart.y = this.target.y
    }
    ////////////////////////////////////////////////////////////////////////////
    else if (App.subMode === "ne") {
      Cursor.posStart.x = this.target.xw - Grid.sizeX
      Cursor.posStart.y = this.target.y
    }
    ////////////////////////////////////////////////////////////////////////////
    else if (App.subMode === "se") {
      Cursor.posStart.x = this.target.xw - Grid.sizeX
      Cursor.posStart.y = this.target.yh - Grid.sizeY
    }
    ////////////////////////////////////////////////////////////////////////////
    else if (App.subMode === "sw") {
      Cursor.posStart.x = this.target.x
      Cursor.posStart.y = this.target.yh - Grid.sizeY
    }
    ////////////////////////////////////////////////////////////////////////////
  }

  onMouseMove() {
    if (Cursor.inertia) return
    ////////////////////////////////////////////////////////////////////////////
    if (App.subMode === "nw") {
      this.target.x = Cursor.pos.x
      this.target.y = Cursor.pos.y
      this.target.width = this.initial.width - Cursor.movedX
      this.target.height = this.initial.height - Cursor.movedY

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
      this.target.width = this.initial.width + Cursor.movedX
      this.target.height = this.initial.height - Cursor.movedY

      if (Cursor.pos.x < this.target.x) {
        this.target.width = 0
        return App.setMode("resize", "nw")
      }
      if (Cursor.pos.y >= this.target.yh) {
        this.target.y = this.initial.yh
        return App.setMode("resize", "se")
      }
    }
    ////////////////////////////////////////////////////////////////////////////
    else if (App.subMode === "se") {
      this.target.width = this.initial.width + Cursor.movedX
      this.target.height = this.initial.height + Cursor.movedY

      if (Cursor.pos.x < this.target.x) {
        this.target.width = 0
        return App.setMode("resize", "sw")
      }
      if (Cursor.pos.y < this.target.y) {
        this.target.height = 0
        return App.setMode("resize", "ne")
      }
    }
    ////////////////////////////////////////////////////////////////////////////
    else if (App.subMode === "sw") {
      this.target.x = Cursor.pos.x
      this.target.width = this.initial.width - Cursor.movedX
      this.target.height = this.initial.height + Cursor.movedY

      if (Cursor.pos.x >= this.target.xw) {
        this.target.x = this.initial.xw
        return App.setMode("resize", "se")
      }

      if (Cursor.pos.y < this.target.y) {
        this.target.height = 0
        return App.setMode("resize", "nw")
      }
    }
    ////////////////////////////////////////////////////////////////////////////
  }

  onMouseUp() {
    // prevent "invisible" actor of zero w/h
    this.target.width = this.target.width <= 0 ? Grid.sizeX : this.target.width
    this.target.height = this.target.height <= 0 ? Grid.sizeY : this.target.height
    App.revertMode()
  }
}
