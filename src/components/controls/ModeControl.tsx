import React from "react"
import {observer} from "mobx-react-lite"
import {
  CursorClickIcon,
  HandIcon,
  LinkIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid"
import {App, AppMode} from "/src/services/App"

export const ModeControl = observer(() => {
  const modes: { mode: AppMode, highlight: AppMode[], icon: JSX.Element }[] = [
    {
      mode: "select",
      highlight: ["select", "dragSelect", "move", "resize"],
      icon: <CursorClickIcon/>,
    },
    {mode: "create", highlight: ["create"], icon: <PlusCircleIcon/>},
    {mode: "pan", highlight: ["pan"], icon: <HandIcon/>},
  ]

  return (
    <div className="flex fixed top-0 left-1/2 h-12 bg-gray-800 -translate-x-1/2">
      {modes.map((m) => (
        <button
          key={m.mode}
          onClick={() => App.setMode(m.mode)}
          className={`relative w-12 h-12 flex items-center justify-center ${m.highlight.includes(App.mode) ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >{m.icon}</button>
      ))}
    </div>
  )
})

ModeControl.displayName = nameof(ModeControl)
