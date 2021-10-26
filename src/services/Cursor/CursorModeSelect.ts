import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Selection} from "/src/services/Selection"
import {Keyboard} from "/src/services/Keyboard"
import {App} from "/src/services/App"

export class CursorModeSelect implements CursorMode {
  onMouseDown(e: MouseEvent) {
    const target = Actor.findByCollision(Cursor.posReal)
    if (target) {
      if (Keyboard.Shift) Selection.toggle(target)
      else if (!Selection.has(target)) Selection.set(target)
    } else {
      if (!Keyboard.Shift && !Cursor.rightClick) Selection.clear()
      App.setMode("dragSelect")
    }
  }

  onMouseMove() {
    if (Cursor.inertia) return
    if (Selection.all.length) App.setMode("move")
  }

  onMouseUp(e: MouseEvent) {
    // allows selecting on out of the currently selected actors
    if (Keyboard.Shift || Cursor.rightClick) return
    const target = Actor.findByCollision(Cursor.posReal)
    if (target) Selection.set(target)
  }
}
