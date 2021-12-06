import React from "react"
import {observer} from "mobx-react-lite"
import {SceneView} from "/src/components/scene/_SceneView"
import {Overlay} from "/src/components/overlay/_Overlay"
import {Controls} from "/src/components/controls/_Controls"
import {DebugOverlay} from "/src/components/debugging/DebugOverlay"
import {Sandbox} from "/src/components/debugging/Sandbox"

export const Root = observer(() => {
  return (<>
    <SceneView/>
    <Overlay/>
    <Controls/>

    <DebugOverlay/>
    {/*<Sandbox/>*/}
  </>)
})

Root.displayName = nameof(Root)
