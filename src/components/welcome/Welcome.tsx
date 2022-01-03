import React, {useEffect, useState} from "react"
import {observer} from "mobx-react-lite"
import {ProjectFs} from "/src/services/FileSystem/ProjectFs"
import {DocumentAddIcon, FolderOpenIcon} from "@heroicons/react/outline"
import {version} from "/package.json"
import coverPlatformer from "/samples/platformer/cover.png"
import coverShooter from "/samples/shooter/cover.png"
import {NowLoading} from "/src/components/controls/NowLoading"
import {Footer} from "/src/components/welcome/Footer"

export const Welcome = observer(() => {
  const [recent, setRecent] = useState([] as FileSystemDirectoryHandle[])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    ProjectFs.getRecent().then(setRecent)
  }, [ProjectFs.isOpen])

  if (ProjectFs.isOpen) return null

  const actions = [
    {name: "New", icon: DocumentAddIcon, fn: () => ProjectFs.open(null, true)},
    {name: "Open", icon: FolderOpenIcon, fn: () => ProjectFs.open()},
  ]
  const samples = [
    {key: "platformer", cover: coverPlatformer},
    {key: "shooter", cover: coverShooter},
  ]

  if (loading) return <NowLoading/>
  else return (
    <div className="flex fixed inset-0 justify-center py-32 bg-gray-900">
      <div className="w-full max-w-2xl">

        <h1 className="mb-2 text-lg font-semibold tracking-wide uppercase">
          GhostLight <span className="text-gray-400">({version})</span>
        </h1>
        <hr className="mb-8 h-1 bg-blue-500 bg-opacity-50"></hr>

        <div className="flex gap-4 items-center mb-16">
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

          <div className="flex justify-center items-center mr-4 ml-auto text-gray-500 -rotate-90">
            <div className="bg-gray-600 h-[1px] absolute w-32"></div>
            <div className="absolute px-2 mb-1 bg-gray-900">Samples</div>
          </div>
          {samples.map(s => (
            <button
              key={s.key}
              className="w-32 h-32 bg-gray-800 shadow"
              onClick={() => {
                setLoading(true)
                ProjectFs.openSample(s.key).finally(() => setLoading(false))
              }}
            >
              <img
                src={s.cover}
                alt={s.key}
                className="grayscale hover:grayscale-0"
              />
            </button>
          ))}
        </div>

        {!!recent.length && <section>
          <h2 className="py-2 pl-3 border-l-4 border-blue-500 border-opacity-50">
            Recent projects
          </h2>
          <div className="flex flex-col-reverse">
            {recent.map((handle) => (
              <button
                key={handle.name}
                className="py-2 pl-4 w-full text-gray-400 hover:text-gray-200"
                onClick={() => ProjectFs.open(handle)}
              >{handle.name}</button>
            ))}
          </div>
        </section>}

        <Footer/>

      </div>
    </div>
  )
})

Welcome.displayName = nameof(Welcome)
