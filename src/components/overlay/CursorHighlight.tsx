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

  const devicePixel = window.devicePixelRatio === 1.5 ? 0.666 : 1

  return (<>
      <div
        className="absolute bg-white bg-opacity-25"
        style={{
          left: Cursor.pos.x * Camera.zoom + devicePixel,
          top: Cursor.pos.y * Camera.zoom + devicePixel,
          width: Grid.sizeX * Camera.zoom - devicePixel,
          height: Grid.sizeY * Camera.zoom - devicePixel,
        }}
      ></div>
      {/*<div*/}
      {/*  className="absolute bg-blue-500 bg-opacity-50"*/}
      {/*  style={{*/}
      {/*    left: Cursor.posStart.x * Camera.zoom,*/}
      {/*    top: Cursor.posStart.y * Camera.zoom,*/}
      {/*    width: Grid.sizeX * Camera.zoom+devicePixel,*/}
      {/*    height: Grid.sizeY * Camera.zoom+devicePixel,*/}
      {/*  }}*/}
      {/*></div>*/}
    </>
  )
})

CursorHighlight.displayName = nameof(CursorHighlight)
