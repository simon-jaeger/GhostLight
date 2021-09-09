import {Cursor} from "/src/services/Cursor/Cursor"
import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Actor} from "/src/models/Actor"

export class CursorModeCreate implements CursorMode {
  onMouseDown() {
    Actor.create({
      shape: {x: Cursor.x, y: Cursor.y, width: 50, height: 50},
      texture: "#6B7280",
    })
  }

}
