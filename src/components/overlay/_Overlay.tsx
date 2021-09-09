import React from "react"
import {observer} from "mobx-react-lite"
import {DebugCursor} from "/src/components/overlay/DebugCursor"

export const Overlay = observer(() => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      <DebugCursor/>
    </div>
  )
})

Overlay.displayName = nameof(Overlay)
