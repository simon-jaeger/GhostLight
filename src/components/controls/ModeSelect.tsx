import React from "react"
import {observer} from "mobx-react-lite"
import {CursorClickIcon, PlusCircleIcon} from "@heroicons/react/solid"
import {App, AppMode} from "/src/services/App"

export const ModeSelect = observer(() => {
  const modes: { mode: AppMode, icon: JSX.Element }[] = [
    {mode: "select", icon: <CursorClickIcon/>},
    {mode: "create", icon: <PlusCircleIcon/>},
  ]

  return (
    <div className="flex absolute top-0 left-0 w-full h-12 bg-gray-800">
      {modes.map((m) => (
        <button
          key={m.mode}
          onClick={() => App.setMode(m.mode)}
          className="flex relative justify-center items-center w-12 h-12 hover:bg-gray-900"
        >
          {App.mode === m.mode &&
          <div className="absolute inset-0 bg-gray-700"></div>}
          <div className="absolute">{m.icon}</div>
        </button>
      ))}
    </div>
  )
})

ModeSelect.displayName = nameof(ModeSelect)
