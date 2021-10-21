import React from "react"
import {observer} from "mobx-react-lite"
import {CursorHighlight} from "/src/components/overlay/CursorHighlight"
import {TransformRing} from "/src/components/overlay/TransformRing"
import {GridView} from "/src/components/overlay/GridView"
import {Camera} from "/src/models/Camera"
import {BorderLines} from "/src/components/overlay/BorderLines"
import {Selection} from "/src/services/Selection"
import {SelectionHighlight} from "/src/components/overlay/SelectionHighlight"
import {Config} from "/src/models/Config"
import {ActorPreview} from "/src/components/overlay/ActorPreview"
import {Cursor} from "/src/services/Cursor/Cursor"
import {App} from "/src/services/App"

export const Overlay = observer(() => {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        left: Camera.x,
        top: Camera.y,
        width: Config.width * Camera.zoom,
        height: Config.height * Camera.zoom,
      }}
    >
      <GridView/>
      <BorderLines/>
      <CursorHighlight/>
      {App.isMode("select", "resize") &&
      Selection.all.map(a => <SelectionHighlight actor={a} key={a.id}/>)}
      <TransformRing/>
      <ActorPreview/>
    </div>
  )
})

Overlay.displayName = nameof(Overlay)
