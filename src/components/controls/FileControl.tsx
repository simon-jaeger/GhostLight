import React, {useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  MenuIcon,
  SaveIcon,
  XIcon,
} from "@heroicons/react/solid"
import {ProjectFs} from "/src/services/FileSystem/ProjectFs"
import {SceneFs} from "/src/services/FileSystem/SceneFs"
import {uSleep} from "/src/helpers/utils"
import {History} from "/src/services/History"
import {TypesFs} from "/src/services/FileSystem/TypesFs"
import {Menu} from "/src/components/generic/Menu"
import {useClickOutside} from "/src/hooks/useClickOutside"

export const FileControl = observer(() => {
  const [saved, setSaved] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const refMenuTrigger = useRef(null)
  useClickOutside(refMenuTrigger, () => setShowMenu(false))

  async function onSave() {
    await SceneFs.save()
    await TypesFs.save()
    setSaved(true)
    await uSleep(1000)
    setSaved(false)
  }

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
      <button
        onClick={onSave}
        className="flex justify-center items-center w-12 h-12 hover:bg-gray-700"
      ><SaveIcon/></button>
      {saved && <span className="ml-2">Saved</span>}

      <Menu
        actions={[
          {name: "New project", fn: () => ProjectFs.open(null, true)},
          {name: "Open project", fn: () => ProjectFs.open()},
          {name: "Help", fn: () => console.log("help")},
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
