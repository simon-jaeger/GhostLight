import React from "react"
import {observer} from "mobx-react-lite"
import {SceneView} from "/src/components/SceneView"
import {DebugView} from "/src/components/DebugView"

export const App = observer(() => {
  return (<>
    <SceneView/>
    <DebugView/>
  </>)
})

App.displayName = nameof(App)
