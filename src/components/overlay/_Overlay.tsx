import React from "react"
import {observer} from "mobx-react-lite"
import {DebugCursor} from "/src/components/overlay/DebugCursor"
import {TransformRing} from "/src/components/overlay/TransformRing"
import {GridView} from "/src/components/overlay/GridView"
import {Camera} from "/src/services/Camera"
import {ZeroLines} from "/src/components/overlay/ZeroLines"
import {Selection} from "/src/services/Selection"
import {SelectionHighlight} from "/src/components/overlay/SelectionHighlight"

export const Overlay = observer(() => {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none"
      style={{left: Camera.x, top: Camera.y}}
    >
      <GridView/>
      <ZeroLines/>
      {Selection.all.map(a => <SelectionHighlight actor={a} key={a.id}/>)}
      <DebugCursor/>
      <TransformRing/>
    </div>
  )
})

Overlay.displayName = nameof(Overlay)
