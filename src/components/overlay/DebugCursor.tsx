import React from "react"
import {observer} from "mobx-react-lite"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Grid} from "/src/services/Grid"

export const DebugCursor = observer(() => {
  return (<>
      <div
        style={{
          position: "absolute",
          left: Cursor.pos.x,
          top: Cursor.pos.y,
          width: Grid.sizeW,
          height: Grid.sizeH,
          background: "orange",
          opacity: 0.5,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          left: Cursor.posStart.x,
          top: Cursor.posStart.y,
          width: Grid.sizeW,
          height: Grid.sizeH,
          background: "cyan",
          opacity: 0.5,
        }}
      ></div>
    </>
  )
})

DebugCursor.displayName = nameof(DebugCursor)
