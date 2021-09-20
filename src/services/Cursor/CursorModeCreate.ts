import {Cursor} from "/src/services/Cursor/Cursor"
import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Actor} from "/src/models/Actor"
import {Grid} from "/src/services/Grid"
import {Selection} from "/src/services/Selection"
import {App} from "/src/services/App"

export class CursorModeCreate implements CursorMode {
  onMouseDown() {
    const actor = Actor.create({
      shape: {...Cursor.pos, width: Grid.sizeW, height: Grid.sizeH},
      texture: {value: "#6B7280", opacity: 100},
    })
    Selection.set(actor)
    App.setMode('resize', 'se')
  }

}
