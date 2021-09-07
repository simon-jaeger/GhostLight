import React from "react"
import {observer} from "mobx-react-lite"
import {DebugView} from "/src/components/controls/DebugView"
import {ModeSelect} from "/src/components/controls/ModeSelect"

export const Controls = observer(() => {
  return (
    <div>
      <ModeSelect/>
      <DebugView/>
    </div>
  )
})
Controls.displayName = nameof(Controls)
