import React from "react"
import {observer} from "mobx-react-lite"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Grid} from "/src/services/Grid"
import {Camera} from "/src/services/Camera"
import {App} from "/src/services/App"
import {uDp} from "/src/helpers/utils"

export const CursorHighlight = observer(() => {
  if (!Grid.show) return null
  if (!App.isMode("select", "resize", "move")) return null
  if (App.isMode("resize") && App.subMode === "") return null

  return (<>
      <div
        className="absolute bg-white bg-opacity-25"
        style={{
          left: Cursor.pos.x * Camera.zoom + uDp(),
          top: Cursor.pos.y * Camera.zoom + uDp(),
          width: Grid.sizeX * Camera.zoom - uDp(),
          height: Grid.sizeY * Camera.zoom - uDp(),
        }}
      ></div>
      {/*<div*/}
      {/*  className="absolute bg-blue-500 bg-opacity-25"*/}
      {/*  style={{*/}
      {/*    left: Cursor.posStart.x * Camera.zoom + uDp(),*/}
      {/*    top: Cursor.posStart.y * Camera.zoom + uDp(),*/}
      {/*    width: Grid.sizeX * Camera.zoom - uDp(),*/}
      {/*    height: Grid.sizeY * Camera.zoom - uDp(),*/}
      {/*  }}*/}
      {/*></div>*/}
    </>
  )
})

CursorHighlight.displayName = nameof(CursorHighlight)
