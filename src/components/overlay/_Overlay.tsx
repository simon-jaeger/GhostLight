import React from "react"
import {observer} from "mobx-react-lite"
import {DebugCursor} from "/src/components/overlay/DebugCursor"
import {TransformRing} from "/src/components/overlay/TransformRing"

export const Overlay = observer(() => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      <DebugCursor/>
      <TransformRing/>
    </div>
  )
})

Overlay.displayName = nameof(Overlay)
