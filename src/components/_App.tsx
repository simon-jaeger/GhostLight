import React from "react"
import {observer} from "mobx-react-lite"
import {SceneView} from "/src/components/SceneView"

export const App = observer(() => {
  return (<>
    <SceneView/>
  </>)
})

App.displayName = nameof(App)
