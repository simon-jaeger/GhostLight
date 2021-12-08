import React from "react"
import {observer} from "mobx-react-lite"
import {SceneView} from "/src/components/scene/_SceneView"
import {Overlay} from "/src/components/overlay/_Overlay"
import {Controls} from "/src/components/controls/_Controls"
import {DebugOverlay} from "/src/components/debugging/DebugOverlay"
import {Sandbox} from "/src/components/debugging/Sandbox"
import {isSupported} from "/src/helpers/isSupported"

export const Root = observer(() => {
  if (!isSupported()) return (
    <div className="p-8 h-screen bg-gray-800">
      <h1 className="mb-2 text-xl">Sorry, your browser is not supported.</h1>
      <p>Please revisit this site with <a
        className="underline"
        href="https://www.google.com/chrome/"
        target="_blank"
      >Google Chrome</a>.</p>
    </div>
  )

  return (<>
    <SceneView/>
    <Overlay/>
    <Controls/>

    <DebugOverlay/>
    {/*<Sandbox/>*/}
  </>)
})

Root.displayName = nameof(Root)
