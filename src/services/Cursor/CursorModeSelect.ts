import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Selection} from "/src/services/Selection"
import {Keyboard} from "/src/services/Keyboard"
import {App} from "/src/services/App"

export class CursorModeSelect implements CursorMode {
  onMouseDown(e: MouseEvent) {
    if (Keyboard.Shift) return
    const target = Actor.findByCollision(Cursor.posReal)
    if (target && (!Selection.all.includes(target))) Selection.set(target)
    else if (!target) {
      Selection.clear()
      App.setMode('dragSelect')
    }
  }

  onMouseMove() {
    if (Cursor.inertia) return
    if (Selection.all.length) App.setMode("move")
  }

  onMouseUp(e: MouseEvent) {
    const target = Actor.findByCollision(Cursor.posReal)
    if (Keyboard.Shift && target) Selection.toggle(target)
    else if (target) return Selection.set(target)
  }

}
