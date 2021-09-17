import React from "react"
import {observer} from "mobx-react-lite"
import {DebugCursor} from "/src/components/overlay/DebugCursor"
import {TransformRing} from "/src/components/overlay/TransformRing"
import {GridView} from "/src/components/overlay/GridView"

export const Overlay = observer(() => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      <GridView/>
      <DebugCursor/>
      <TransformRing/>
    </div>
  )
})

Overlay.displayName = nameof(Overlay)
