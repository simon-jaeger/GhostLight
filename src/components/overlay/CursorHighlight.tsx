import React from "react"
import {observer} from "mobx-react-lite"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Grid} from "/src/services/Grid"
import {Camera} from "/src/services/Camera"

export const CursorHighlight = observer(() => {
  if (!Grid.show) return null

  return (<>
      <div
        className="absolute bg-white bg-opacity-25 border"
        style={{
          left: Cursor.pos.x * Camera.zoom,
          top: Cursor.pos.y * Camera.zoom,
          width: Grid.sizeW * Camera.zoom,
          height: Grid.sizeH * Camera.zoom,
        }}
      ></div>
      {/*<div*/}
      {/*  style={{*/}
      {/*    position: "absolute",*/}
      {/*    left: Cursor.posStart.x * Camera.zoom,*/}
      {/*    top: Cursor.posStart.y * Camera.zoom,*/}
      {/*    width: Grid.sizeW * Camera.zoom,*/}
      {/*    height: Grid.sizeH * Camera.zoom,*/}
      {/*    background: "cyan",*/}
      {/*    opacity: 0.5,*/}
      {/*  }}*/}
      {/*></div>*/}
    </>
  )
})

CursorHighlight.displayName = nameof(CursorHighlight)
