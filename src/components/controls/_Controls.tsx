import React from "react"
import {observer} from "mobx-react-lite"
import {DebugView} from "/src/components/controls/DebugView"
import {ModeSelect} from "/src/components/controls/ModeSelect"
import {ActorDetails} from "/src/components/controls/ActorDetails"
import {GridControl} from "/src/components/controls/GridControl"

export const Controls = observer(() => {
  return (
    <div>
      <ModeSelect/>
      <GridControl/>
      <ActorDetails/>
      <DebugView/>
    </div>
  )
})

Controls.displayName = nameof(Controls)
