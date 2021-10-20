import React, {useEffect, useRef} from "react"
import {observer} from "mobx-react-lite"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Camera} from "/src/models/Camera"
import {ActorPreview} from "/src/components/scene/ActorPreview"
import {Config} from "/src/models/Config"
import {ActorList} from "/src/components/scene/ActorList"

export const SceneView = observer(() => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => Cursor.addEventListeners(ref.current!), [])

  return (
    <div
      ref={ref}
      className="absolute t-max"
      style={{
        left: Camera.x,
        top: Camera.y,
        background: Config.background,
        width: Config.width * Camera.zoom,
        height: Config.height * Camera.zoom,
      }}
    >
      <ActorPreview/>
      <ActorList/>
    </div>
  )
})


SceneView.displayName = nameof(SceneView)
