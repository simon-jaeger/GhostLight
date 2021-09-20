import React from "react"
import {observer} from "mobx-react-lite"
import {DebugCursor} from "/src/components/overlay/DebugCursor"
import {TransformRing} from "/src/components/overlay/TransformRing"
import {GridView} from "/src/components/overlay/GridView"
import {Camera} from "/src/services/Camera"

export const Overlay = observer(() => {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none"
      style={{left: Camera.x, top: Camera.y}}
    >
      <GridView/>
      <DebugCursor/>
      <TransformRing/>
    </div>
  )
})

Overlay.displayName = nameof(Overlay)
