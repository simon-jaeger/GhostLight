import {Cursor} from "/src/services/Cursor/Cursor"
import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Actor} from "/src/models/Actor"

export class CursorModeCreate implements CursorMode {
  onMouseDown() {
    Actor.create({
      shape: {...Cursor.pos, width: 50, height: 50},
      texture: "#6B7280",
    })
  }

}
