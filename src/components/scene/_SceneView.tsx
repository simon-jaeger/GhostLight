import React, {useEffect, useRef} from "react"
import {observer} from "mobx-react-lite"
import {Actor} from "/src/models/Actor"
import {ActorView} from "/src/components/scene/ActorView"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Camera} from "/src/services/Camera"
import {ActorPreview} from "/src/components/scene/ActorPreview"

export const SceneView = observer(() => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => Cursor.addEventListeners(ref.current!), [])

  return (
    <div
      ref={ref}
      className="absolute inset-0 t-max"
      style={{
        left: Camera.x,
        top: Camera.y,
      }}
    >
      {Actor.all.map(a => <ActorView actor={a} key={a.id}/>)}
      <ActorPreview/>
    </div>
  )
})

SceneView.displayName = nameof(SceneView)
