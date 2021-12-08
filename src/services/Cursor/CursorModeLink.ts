import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {App} from "/src/services/App"

export class CursorModeLink implements CursorMode {
  onMouseUp() {
    const actor: Actor = App.subMode.from
    const prop: string = App.subMode.prop
    const target = Actor.findByCollision(Cursor.posReal)
    if (!target) return
    actor.props[prop] = target.id
    App.revertMode()
  }
}
