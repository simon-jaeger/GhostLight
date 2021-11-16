import React from "react"
import {observer} from "mobx-react-lite"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Grid} from "/src/services/Grid"
import {Camera} from "/src/services/Camera"
import {App} from "/src/services/App"

export const CursorHighlight = observer(() => {
  if (!Grid.show) return null
  if (!App.isMode("select", "resize", "move")) return null
  if (App.isMode("resize") && App.subMode === "") return null

  return (<>
      <div
        className="absolute bg-white bg-opacity-25"
        style={{
          left: Cursor.pos.x * Camera.zoom + 1,
          top: Cursor.pos.y * Camera.zoom + 1,
          width: Grid.sizeX * Camera.zoom - 1,
          height: Grid.sizeY * Camera.zoom - 1,
        }}
      ></div>
    </>
  )
})

CursorHighlight.displayName = nameof(CursorHighlight)
