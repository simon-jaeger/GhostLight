import React from "react"
import {observer} from "mobx-react-lite"
import {Project} from "/src/services/FileSystem/Project"
import {DocumentAddIcon, FolderOpenIcon} from "@heroicons/react/outline"

export const Welcome = observer(() => {
  if (Project.isOpen) return null

  const actions = [
    {name: "New", icon: DocumentAddIcon, fn: () => Project.create()},
    {name: "Open", icon: FolderOpenIcon, fn: () => Project.open()},
  ]

  return (
    <div className="flex fixed inset-0 justify-center py-48 bg-gray-900">
      <div className="w-[640px]">
        <h1 className="font-semibold text-lg tracking-wide uppercase mb-2">
          GhostLight <span className="text-gray-400">(Alpha)</span>
        </h1>
        <hr className="h-1 bg-blue-500 bg-opacity-50 mb-8"></hr>
        <div className="flex gap-4">
          {actions.map(a => (
            <button
              key={a.name}
              className="flex relative flex-col items-center w-32 h-32 bg-gray-800 rounded shadow hover:ring"
              onClick={a.fn}
            >
              <a.icon width="0" className="flex-1 w-12 text-gray-300"/>
              <span className="bottom-0 p-2 w-full text-center border-t border-gray-600">{a.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
})

Welcome.displayName = nameof(Welcome)
