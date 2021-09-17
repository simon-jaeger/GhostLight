import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Selection} from "/src/services/Selection"
import {Keyboard} from "/src/services/Keyboard"
import {App} from "/src/services/App"

export class CursorModeSelect implements CursorMode {
  onMouseDown() {
    if (Keyboard.Shift) return
    const target = Actor.findByCollision(Cursor.pos)
    if (target && (!target.isSelected())) Selection.set(target)
    else if (!target) return Selection.clear()
  }

  onMouseMove() {
    if (!Cursor.down) return
    if (Selection.all.length) App.setMode("move")
  }

  onMouseUp() {
    const target = Actor.findByCollision(Cursor.pos)
    if (Keyboard.Shift && target) Selection.toggle(target)
    else if (target) return Selection.set(target)
  }

}
