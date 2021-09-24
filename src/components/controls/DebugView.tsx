import React from "react"
import {observer} from "mobx-react-lite"
import {App} from "/src/services/App"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Textures} from "/src/services/Textures"

export const DebugView = observer(() => {
  return (
    <div className="fixed right-0 top-1/2 p-4 space-y-4 w-64 h-full bg-gray-800 border-t border-gray-600">
      <h2>debug view</h2>
      <pre>mode: {App.mode} {App.subMode}</pre>
      <pre>cursor: {JSON.stringify({
        ...Cursor.pos,
        movedX: Cursor.movedX,
        movedY: Cursor.movedY,
        inertia: Cursor.inertia,
      }, null, 2)}</pre>
      <pre>texture active: { Textures.active }</pre>
      <pre>textures: {JSON.stringify(Textures.all, null, 2)}</pre>
    </div>
  )
})

DebugView.displayName = nameof(DebugView)
