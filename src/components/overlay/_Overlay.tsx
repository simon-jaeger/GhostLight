import React from "react"
import {observer} from "mobx-react-lite"
import {CursorHighlight} from "/src/components/overlay/CursorHighlight"
import {TransformRing} from "/src/components/overlay/TransformRing"
import {GridView} from "/src/components/overlay/GridView"
import {Camera} from "/src/services/Camera"
import {ZeroLines} from "/src/components/overlay/ZeroLines"
import {Selection} from "/src/services/Selection"
import {SelectionHighlight} from "/src/components/overlay/SelectionHighlight"
import {Config} from "/src/models/Config"

export const Overlay = observer(() => {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none"
      style={{
        left: Camera.x,
        top: Camera.y,
        width: Config.width * Camera.zoom,
        height: Config.height * Camera.zoom,
      }}
    >
      <GridView/>
      <ZeroLines/>
      <CursorHighlight/>
      {Selection.all.map(a => <SelectionHighlight actor={a} key={a.id}/>)}
      <TransformRing/>
    </div>
  )
})

Overlay.displayName = nameof(Overlay)
