import React from "react"
import {observer} from "mobx-react-lite"
import {Debugger} from "/src/services/Debugger"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {App} from "/src/services/App"
import {Selection} from "/src/services/Selection"
import {History} from "/src/services/History"

export const DebugOverlay = observer(() => {
  if (!Debugger.active) return null

  return (
    <div className="grid fixed bottom-0 right-52 left-64 grid-cols-4 grid-rows-3 grid-flow-col p-4 h-24 font-mono text-gray-300 bg-clip-padding bg-black bg-opacity-80 border border-transparent pointer-events-none">
      <div>fps: {Debugger.fps}</div>
      <div>delta: {Debugger.delta.toFixed(3)}</div>
      <div>actors: {Actor.all.length}</div>

      <div className="truncate">mode: {App.mode} {JSON.stringify(App.subMode)}</div>
      <div>cursor: {Cursor.pos.x + " " + Cursor.pos.y}</div>
      <div>selected: {Selection.all.length}</div>

      <div>undo stack: {History.undoStack.length}</div>
      <div>redo stack: {History.redoStack.length}</div>
    </div>
  )
})

DebugOverlay.displayName = nameof(DebugOverlay)
