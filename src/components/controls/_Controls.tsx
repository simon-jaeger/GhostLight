import React from "react"
import {observer} from "mobx-react-lite"
import {DebugView} from "/src/components/controls/DebugView"
import {ModeControl} from "/src/components/controls/ModeControl"
import {ActorControl} from "/src/components/controls/ActorControl"
import {GridControl} from "/src/components/controls/GridControl"
import {CameraControl} from "/src/components/controls/CameraControl"

export const Controls = observer(() => {
  return (
    <div>
      <ModeControl/>
      <ActorControl/>
      <CameraControl/>
      <GridControl/>
      <DebugView/>
    </div>
  )
})

Controls.displayName = nameof(Controls)
