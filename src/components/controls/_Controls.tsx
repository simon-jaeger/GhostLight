import React from "react"
import {observer} from "mobx-react-lite"
import {DebugView} from "/src/components/controls/DebugView"
import {ModeControl} from "/src/components/controls/ModeControl"
import {ActorControl} from "/src/components/controls/ActorControl"
import {GridControl} from "/src/components/controls/GridControl"
import {CameraControl} from "/src/components/controls/CameraControl"
import {FileControl} from "/src/components/controls/FileControl"

export const Controls = observer(() => {
  return (
    <div>
      <div className="fixed top-0 w-full h-12 bg-gray-800 ring-1 ring-gray-600"></div>
      <div className="fixed bottom-0 w-full h-12 bg-gray-800 ring-1 ring-gray-600"></div>
      <FileControl/>
      <ModeControl/>
      <CameraControl/>
      <GridControl/>
      <ActorControl/>
      <DebugView/>
    </div>
  )
})

Controls.displayName = nameof(Controls)
