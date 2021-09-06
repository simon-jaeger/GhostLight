import React from "react"
import {autorun} from "mobx"
import {observer} from "mobx-react-lite"
import {Config} from "/src/models/Config"

autorun(() => document.body.style.backgroundColor = Config.background)

export const SceneView = observer(() => {
  return (
    <div
      style={{width: Config.width, height: Config.height}}
      className="ring-1 ring-white ring-opacity-20"
    >
    </div>
  )
})
SceneView.displayName = nameof(SceneView)
