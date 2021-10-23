import {Cursor} from "/src/services/Cursor/Cursor"
import {CursorMode} from "/src/services/Cursor/CursorMode"
import {Actor} from "/src/models/Actor"
import {Selection} from "/src/services/Selection"
import {App} from "/src/services/App"
import {Assets} from "/src/services/FileSystem/Assets"

export class CursorModeCreate implements CursorMode {
  onMouseDown() {
    const asset = Assets.active
    const actor = Actor.create({
      shape: {...Cursor.pos, width: asset.image.width, height: asset.image.height},
      sprite: {texture: asset.key, opacity: 100},
    })
    Selection.set(actor)
    App.setMode("resize")
  }

}
