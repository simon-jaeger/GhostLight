import React from "react"
import {observer} from "mobx-react-lite"
import {Actor} from "/src/models/Actor"
import {App} from "/src/services/App"
import {Cursor} from "/src/services/Cursor/Cursor"

export const DebugView = observer(() => {
  const actor = Actor.all[0]
  if (!actor) return null
  return (
    <div className="fixed right-0 top-1/2 p-4 space-y-4 w-64 h-full bg-gray-800 border border-gray-500">
      <h2>debug view</h2>
      <pre>mode: {App.mode} {App.subMode}</pre>
      <pre>cursor: {JSON.stringify({
        ...Cursor.pos,
        movedX: Cursor.movedX,
        movedY: Cursor.movedY,
        inertia: Cursor.inertia,
      }, null, 2)}</pre>
      {/*<pre>cam: { JSON.stringify(Camera, null, 2) }</pre>*/}
      {/*<pre>{JSON.stringify(Keyboard, null, 2)}</pre>*/}
    </div>
  )
})

DebugView.displayName = nameof(DebugView)
