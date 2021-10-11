import React, {useEffect, useState} from "react"
import {observer} from "mobx-react-lite"
import {Project} from "/src/services/FileSystem/Project"
import {DocumentAddIcon, FolderOpenIcon} from "@heroicons/react/outline"

export const Welcome = observer(() => {
  const [recent, setRecent] = useState([] as FileSystemDirectoryHandle[])
  useEffect(() => {
    Project.getRecent().then(setRecent)
  }, [])

  if (Project.isOpen) return null

  const actions = [
    {name: "New", icon: DocumentAddIcon, fn: () => Project.create()},
    {name: "Open", icon: FolderOpenIcon, fn: () => Project.open()},
  ]

  return (
    <div className="flex fixed inset-0 justify-center py-32 bg-gray-900">
      <div className="w-[640px]">

        <h1 className="mb-2 text-lg font-semibold tracking-wide uppercase">
          GhostLight <span className="text-gray-400">(Alpha)</span>
        </h1>
        <hr className="mb-8 h-1 bg-blue-500 bg-opacity-50"></hr>

        <div className="flex gap-4 mb-16">
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

        {recent.length && <section>
          <h2 className="py-2 pl-3 border-l-4 border-blue-500 border-opacity-50">
            Recent projects
          </h2>
          <div className="flex flex-col-reverse">
            {recent.map((handle) => (
              <button
                key={handle.name}
                className="py-2 pl-4 w-full text-gray-400 hover:text-gray-200"
                onClick={() => Project.open(handle)}
              >{handle.name}</button>
            ))}
          </div>
        </section>}

      </div>
    </div>
  )
})

Welcome.displayName = nameof(Welcome)
