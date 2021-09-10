import React from "react"
import {observer} from "mobx-react-lite"
import {TextField} from "/src/components/generic/TextField"
import {Actor} from "/src/models/Actor"
import {Button} from "/src/components/generic/Button"
import {Keyboard} from "/src/services/Keyboard"
import {App} from "/src/services/App"
import {Cursor} from "/src/services/Cursor/Cursor"

export const DebugView = observer(() => {
  const actor = Actor.all[0]
  if (!actor) return null
  return (
    <div className="fixed top-0 right-0 p-4 space-y-4 w-64 h-full bg-gray-800 border border-gray-500">
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
      <TextField
        label="width"
        type="number"
        value={actor.shape.width}
        onChange={(v) => actor.shape.width = v}
      />
      <TextField
        label="height"
        type="number"
        value={actor.shape.height}
        onChange={(v) => actor.shape.height = v}
      />
      <Button onClick={() => console.log("click")}>Button</Button>
      <pre>mode: { App.mode }</pre>
      <pre>{ JSON.stringify(Keyboard, null, 2) }</pre>
    </div>
  )
})

DebugView.displayName = nameof(DebugView)
