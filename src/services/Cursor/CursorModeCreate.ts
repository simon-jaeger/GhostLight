import {Cursor} from "/src/services/Cursor/Cursor"
import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Actor} from "/src/models/Actor"
import {Selection} from "/src/services/Selection"
import {App} from "/src/services/App"
import {Type} from "/src/models/Type"
import {uCollision} from "/src/helpers/utils"
import {Grid} from "/src/services/Grid"

export class CursorModeCreate implements CursorMode {
  private created: Actor[] = []

  private onCreate() {
    const type = Type.active.value
    const shape: Shape = {
      x: Cursor.pos.x,
      y: Cursor.pos.y,
      width: type.width || Grid.sizeX,
      height: type.height || Grid.sizeY,
    }
    if (this.created.find((a) => uCollision(a.shape, shape))) return
    const actor = Actor.create({
      ...shape,
      type_id: type.id,
    })
    Selection.set(actor)
    this.created.push(actor)
    if (type.resize !== "Disabled") App.setMode("resize")
  }

  onLeave() {
    this.created = []
  }

  onMouseDown() {
    if (Cursor.rightClick) return
    this.onCreate()
  }

  onMouseUp() {
    this.created = []
  }

  onMouseMove() {
    if (!Cursor.down) return
    // console.log(this.created.find((a) => uCollision(a.shape, this.getShape())))
    // if (this.created.find((a) => uCollision(a.shape, this.getShape()))) return
    this.onCreate()
  }

}
