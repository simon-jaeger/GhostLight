import {Cursor} from "/src/services/Cursor/Cursor"
import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Actor} from "/src/models/Actor"
import {Selection} from "/src/services/Selection"
import {App} from "/src/services/App"
import {Type} from "/src/models/Type"
import {Grid} from "/src/services/Grid"

export class CursorModeCreate implements CursorMode {
  onMouseDown() {
    if (Cursor.rightClick) return
    this.create()
  }

  onMouseMove() {
    if (!Cursor.down) return
    this.create()
  }

  private create() {
    const type = Type.active.value
    const x = Cursor.pos.x
    const y = Cursor.pos.y
    const width = type.width || Grid.sizeX
    const height = type.height || Grid.sizeY
    if (Actor.all.find((a) => a.type.id === type.id && a.x === x && a.y === y)) return
    const actor = Actor.create({x, y, width, height, type_id: type.id})
    Selection.set(actor)
    if (type.resize !== "Disabled") App.setMode("resize")
  }

}
