import React from "react"
import {observer} from "mobx-react-lite"
import {SceneView} from "/src/components/scene/_SceneView"
import {Overlay} from "/src/components/overlay/_Overlay"
import {Controls} from "/src/components/controls/_Controls"

export const Root = observer(() => {
  return (<>
    <SceneView/>
    <Overlay/>
    <Controls/>
  </>)
})

Root.displayName = nameof(Root)
