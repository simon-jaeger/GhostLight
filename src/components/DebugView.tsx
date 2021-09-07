import React from "react"
import {observer} from "mobx-react-lite"
import {TextField} from "/src/components/generic/TextField"
import {Actor} from "/src/models/Actor"

export const DebugView = observer(() => {
  const actor = Actor.all[0]
  return (
    <div className="fixed top-0 right-0 p-4 w-64 h-full bg-gray-800 space-y-4">
      <h2>debug view</h2>
      <TextField
        label="x"
        type="number"
        value={actor.shape.x}
        onChange={(v) => actor.shape.x = v}
      />
      <TextField
        label="y"
        type="number"
        value={actor.shape.y}
        onChange={(v) => actor.shape.y = v}
      />
    </div>
  )
})

DebugView.displayName = nameof(DebugView)
