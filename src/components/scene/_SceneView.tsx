import React from "react"
import {observer} from "mobx-react-lite"
import {Actor} from "/src/models/Actor"
import {ActorView} from "/src/components/scene/ActorView"

export const SceneView = observer(() => {
  return (
    <div
      style={{width: 99999, height: 99999}}
      className="ring-1 ring-white ring-opacity-50 translate-x-4 translate-y-4"
    >
      {Actor.all.map(a => <ActorView actor={a} key={a.id}/>)}
    </div>
  )
})
SceneView.displayName = nameof(SceneView)
