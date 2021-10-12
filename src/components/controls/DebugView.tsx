import React from "react"
import {observer} from "mobx-react-lite"
import {Debugger} from "/src/services/Debugger"

export const DebugView = observer(() => {
  if (!Debugger.active) return null

  return (
    <div className="fixed left-0 top-1/2 p-4 space-y-4 w-64 h-full bg-gray-800 border-t border-gray-600">
      <h2 className="mb-4">debug view</h2>
    </div>
  )
})

DebugView.displayName = nameof(DebugView)
