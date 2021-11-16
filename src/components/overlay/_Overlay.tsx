import React from "react"
import {observer} from "mobx-react-lite"
import {CursorHighlight} from "/src/components/overlay/CursorHighlight"
import {TransformRing} from "/src/components/overlay/TransformRing"
import {GridView} from "/src/components/overlay/GridView"
import {Camera} from "/src/services/Camera"
import {BorderLines} from "/src/components/overlay/BorderLines"
import {Selection} from "/src/services/Selection"
import {SelectionHighlight} from "/src/components/overlay/SelectionHighlight"
import {Config} from "/src/models/Config"
import {ActorPreview} from "/src/components/overlay/ActorPreview"
import {App} from "/src/services/App"
import {SelectionRectangle} from "/src/components/overlay/SelectionRectangle"

export const Overlay = observer(() => {
  return (
    <section
      id="overlay"
      className="absolute pointer-events-none select-none"
      style={{
        left: Camera.x,
        top: Camera.y,
        width: Config.width * Camera.zoom,
        height: Config.height * Camera.zoom,
        zoom: 1 / devicePixelRatio, // fix high dpi screens
      }}
    >
      <GridView/>
      <BorderLines/>
      <CursorHighlight/>
      {App.isMode("select", "dragSelect", "resize", "create") &&
      Selection.all.map(a => <SelectionHighlight actor={a} key={a.id}/>)}
      <SelectionRectangle/>
      <TransformRing/>
      <ActorPreview/>
    </section>
  )
})

Overlay.displayName = nameof(Overlay)
