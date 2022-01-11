import React, {useEffect, useState} from "react"
import {observer} from "mobx-react-lite"
import {ProjectFs} from "/src/services/FileSystem/ProjectFs"
import {DocumentAddIcon, FolderOpenIcon} from "@heroicons/react/outline"
import {ghostlight, version} from "/package.json"
import coverPlatformer from "/samples/platformer/cover.png"
import coverShooter from "/samples/shooter/cover.png"
import coverDungeon from "/samples/dungeon/cover.png"
import {NowLoading} from "/src/components/controls/NowLoading"
import {Footer} from "/src/components/welcome/Footer"
import {QuestionMarkCircleIcon} from "@heroicons/react/solid"

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
    {
      name: "Help",
      icon: QuestionMarkCircleIcon,
      fn: () => window.open(ghostlight.help, "_blank"),
    },
  ]
  const samples = [
    {key: "platformer", title: "Platformer", cover: coverPlatformer},
    {key: "shooter", title: "Shooter", cover: coverShooter},
    {key: "dungeon", title: "Dungeon crawler", cover: coverDungeon},
  ]

  if (loading) return <NowLoading/>
  else return (
    <div className="flex fixed inset-0 justify-center py-24 bg-gray-900">
      <div className="relative w-full max-w-3xl">

        <h1 className="mb-2 text-lg font-semibold tracking-wide uppercase">
          GhostLight <span className="text-gray-400">({version})</span>
        </h1>
        <hr className="mb-8 h-1 bg-blue-500 bg-opacity-50"></hr>

        <section className="flex gap-4 mb-16">
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
        </section>

        {!!recent.length && <section className="">
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

        <section className="absolute right-0 top-16 mt-2">
          <h2
            className="flex leading-none absolute gap-2 items-center h-32 rotate-180 -translate-x-12"
            style={{writingMode: "vertical-lr"}}
          >
            <div className="bg-gray-600 w-px grow"></div>
            <div className="px-2 text-gray-400">Samples</div>
            <div className="bg-gray-600 w-px grow"></div>
          </h2>
          {samples.map(s => (
            <button
              key={s.key}
              title={s.title}
              className="mb-4 w-32 h-32 bg-gray-800 shadow"
              onClick={() => {
                setLoading(true)
                ProjectFs.openSample(s.key).finally(() => setLoading(false))
              }}
            >
              <img
                src={s.cover}
                alt={s.key}
                width={128}
                height={128}
                className="object-cover w-full grayscale hover:grayscale-0"
              />
            </button>
          ))}
        </section>

        <Footer/>

      </div>
    </div>
  )
})

Welcome.displayName = nameof(Welcome)
