import React from "react"
import {observer} from "mobx-react-lite"
import {DebugView} from "/src/components/controls/DebugView"

export const Controls = observer(() => {
  return (
    <div>
      <DebugView/>
    </div>
  )
})
Controls.displayName = nameof(Controls)
