import {Cursor} from "/src/services/Cursor/Cursor"
import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Actor} from "/src/models/Actor"
import {Selection} from "/src/services/Selection"
import {App} from "/src/services/App"
import {Textures} from "/src/services/Textures"

export class CursorModeCreate implements CursorMode {
  onMouseDown() {
    const tx = Textures.active
    const actor = Actor.create({
      shape: {...Cursor.pos, width: tx.width, height: tx.height},
      sprite: {texture: tx.key, opacity: 100},
    })
    Selection.set(actor)
    App.setMode("resize")
  }

}
