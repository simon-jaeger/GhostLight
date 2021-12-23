import React, {useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {ArrowCircleLeftIcon, ArrowCircleRightIcon, MenuIcon, XIcon} from "@heroicons/react/solid"
import {ProjectFs} from "/src/services/FileSystem/ProjectFs"
import {History} from "/src/services/History"
import {Menu} from "/src/components/generic/Menu"
import {useClickOutside} from "/src/hooks/useClickOutside"
import {ghostlight} from "/package.json"

export const FileControl = observer(() => {
  const [showMenu, setShowMenu] = useState(false)
  const refMenuTrigger = useRef(null)
  useClickOutside(refMenuTrigger, () => setShowMenu(false))

  return (
    <div className="flex fixed top-0 left-0 items-center h-12 bg-gray-800">
      <button
        ref={refMenuTrigger}
        onClick={() => setShowMenu(!showMenu)}
        className="flex justify-center items-center w-12 h-12 hover:bg-gray-700"
      >{showMenu ? <XIcon/> : <MenuIcon/>}</button>
      <button
        disabled={History.undoStack.length <= 1}
        onClick={() => History.undo()}
        className="flex justify-center items-center w-12 h-12 disabled:opacity-50 hover:bg-gray-700"
      ><ArrowCircleLeftIcon/></button>
      <button
        disabled={History.redoStack.length <= 0}
        onClick={() => History.redo()}
        className="flex justify-center items-center w-12 h-12 disabled:opacity-50 hover:bg-gray-700"
      ><ArrowCircleRightIcon/></button>

      <Menu
        actions={[
          {name: "New project", fn: () => ProjectFs.open(null, true)},
          {name: "Open project", fn: () => ProjectFs.open()},
          {name: "Help", fn: () => window.open(ghostlight.help, "_blank")},
          {name: "Exit", fn: () => ProjectFs.close()},
        ]}
        style={{
          visibility: showMenu ? "visible" : "hidden",
          position: "absolute",
          width: 128,
          top: 48,
          left: 0,
        }}
      />
    </div>
  )
})

FileControl.displayName = nameof(FileControl)
