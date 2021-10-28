import React, {useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {Debugger} from "/src/services/Debugger"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {App} from "/src/services/App"
import {Selection} from "/src/services/Selection"
import {History} from "/src/services/History"

export const DebugView = observer(() => {
  if (!Debugger.active) return null

  return (
    <div className="grid fixed bottom-12 right-48 left-64 grid-cols-4 grid-rows-3 grid-flow-col p-4 h-24 font-mono text-gray-300 bg-black bg-opacity-80 pointer-events-none">
      <div>fps: {Debugger.fps}</div>
      <div>delta: {Debugger.delta.toFixed(3)}</div>
      <div>actors: {Actor.all.length}</div>

      <div>mode: {App.mode} {App.subMode}</div>
      <div>cursor: {Cursor.pos.x + " " + Cursor.pos.y}</div>
      <div>selected: {Selection.all.length}</div>

      <div>undo stack: {History.undoStack.length}</div>
      <div>redo stack: {History.redoStack.length}</div>
    </div>
  )
})

DebugView.displayName = nameof(DebugView)
