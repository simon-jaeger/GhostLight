import React from "react"
import {autorun} from "mobx"
import {observer} from "mobx-react-lite"
import {Config} from "/src/models/Config"
import {Actor} from "/src/models/Actor"
import {ActorView} from "/src/components/ActorView"

autorun(() => document.body.style.backgroundColor = Config.background)

export const SceneView = observer(() => {
  return (
    <div
      style={{width: Config.width, height: Config.height}}
      className="ring-1 ring-white ring-opacity-20"
    >
      {Actor.all.map(a => <ActorView actor={a} key={a.id}/>)}
    </div>
  )
})
SceneView.displayName = nameof(SceneView)
