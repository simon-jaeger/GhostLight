import React, {useEffect, useRef} from "react"
import {observer} from "mobx-react-lite"
import {Actor} from "/src/models/Actor"
import {ActorView} from "/src/components/scene/ActorView"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Camera} from "/src/models/Camera"
import {ActorPreview} from "/src/components/scene/ActorPreview"
import {Config} from "/src/models/Config"

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
      {Actor.all.map(a => <ActorView actor={a} key={a.id}/>)}
      <ActorPreview/>
    </div>
  )
})

SceneView.displayName = nameof(SceneView)
