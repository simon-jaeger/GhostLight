import React from "react"
import {observer} from "mobx-react-lite"
import {Config} from "/src/models/Config"
import {Canvas} from "/src/components/scene/Canvas"
import {Camera} from "/src/services/Camera"

export const SceneView = observer(() => {
  return (
    <section
      id="scene"
      className="fixed inset-0"
      style={{
        zoom: 1 / devicePixelRatio, // fix high dpi screens
      }}
    >
      <Canvas/>
      {/*background*/}
      <div
        style={{
          zIndex: -10,
          position: "absolute",
          top: Camera.y,
          left: Camera.x,
          background: Config.background,
          width: Config.width * Camera.zoom,
          height: Config.height * Camera.zoom,
        }}
      ></div>
    </section>
  )
})

SceneView.displayName = nameof(SceneView)
