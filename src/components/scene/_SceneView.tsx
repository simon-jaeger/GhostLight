import React from "react"
import {observer} from "mobx-react-lite"
import {Config} from "/src/models/Config"
import {Canvas} from "/src/components/scene/Canvas"

export const SceneView = observer(() => {
  return (
    <section
      id="scene"
      className="fixed inset-0"
      style={{
        background: Config.background,
        zoom: 1 / devicePixelRatio, // fix high dpi screens
      }}
    >
      <Canvas/>
    </section>
  )
})

SceneView.displayName = nameof(SceneView)
