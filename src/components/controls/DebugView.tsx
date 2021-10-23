import React from "react"
import {observer} from "mobx-react-lite"
import {Debugger} from "/src/services/Debugger"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"

export const DebugView = observer(() => {
  if (!Debugger.active) return null

  return (
    <div className="fixed bottom-12 right-48 left-64 p-4 h-24 font-mono text-gray-300 bg-black bg-opacity-50">
      <div>fps: {Debugger.fps.toFixed(1)}</div>
      <div>actors: {Actor.all.length}</div>
      <div>cursor: {Cursor.pos.x + " " + Cursor.pos.y}</div>
    </div>
  )
})

DebugView.displayName = nameof(DebugView)
