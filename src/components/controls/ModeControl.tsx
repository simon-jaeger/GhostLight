import React from "react"
import {observer} from "mobx-react-lite"
import {CursorClickIcon, HandIcon, PlusCircleIcon} from "@heroicons/react/solid"
import {App, AppMode} from "/src/services/App"

export const ModeControl = observer(() => {
  const modes: { mode: AppMode, icon: JSX.Element }[] = [
    {mode: "select", icon: <CursorClickIcon/>},
    {mode: "create", icon: <PlusCircleIcon/>},
    {mode: "pan", icon: <HandIcon/>},
  ]

  return (
    <div className="flex absolute top-0 left-1/2 h-12 bg-gray-800 -translate-x-1/2">
      {modes.map((m) => (
        <button
          key={m.mode}
          onClick={() => App.setMode(m.mode)}
          className={`relative w-12 h-12 flex items-center justify-center ${m.mode === App.mode ? "bg-gray-700" : "hover:bg-gray-900"}`}
        >{m.icon}</button>
      ))}
    </div>
  )
})

ModeControl.displayName = nameof(ModeControl)
