import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Selection} from "/src/services/Selection"
import {Keyboard} from "/src/services/Keyboard"

export class CursorModeSelect implements CursorMode {
  onMouseDown() {
    const target = Actor.findByCollision(Cursor.shape)

    if (Keyboard.Shift) {
      if (target) Selection.toggle(target)
    }

    else {
      if (target) Selection.set(target)
      else Selection.clear()
    }
  }

}
