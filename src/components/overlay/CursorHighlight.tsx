import React from "react"
import {observer} from "mobx-react-lite"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Grid} from "/src/models/Grid"
import {Camera} from "/src/models/Camera"
import {App} from "/src/services/App"

export const CursorHighlight = observer(() => {
  if (!Grid.show) return null
  if (!App.isMode("select", "resize", "move")) return null
  if (App.isMode("resize") && App.subMode === "") return null

  const offset = devicePixelRatio === 1.5 ? 1 / 1.5 : 1

  return (<>
      <div
        className="absolute bg-white bg-opacity-25"
        style={{
          left: Cursor.pos.x * Camera.zoom + offset,
          top: Cursor.pos.y * Camera.zoom + offset,
          width: Grid.sizeX * Camera.zoom - offset,
          height: Grid.sizeY * Camera.zoom - offset,
        }}
      ></div>
    </>
  )
})

CursorHighlight.displayName = nameof(CursorHighlight)
