import React, {useState} from "react"
import {observer} from "mobx-react-lite"
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  MenuIcon,
  SaveIcon,
} from "@heroicons/react/solid"
import {ProjectFs} from "/src/services/FileSystem/ProjectFs"
import {SceneFs} from "/src/services/FileSystem/SceneFs"
import {uSleep} from "/src/helpers/utils"
import {History} from "/src/services/History"
import {TypesFs} from "/src/services/FileSystem/TypesFs"

export const FileControl = observer(() => {
  const [saved, setSaved] = useState(false)

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
        onClick={() => ProjectFs.open()}
        className="flex justify-center items-center w-12 h-12 hover:bg-gray-700"
      ><MenuIcon/></button>
      <button
        onClick={() => History.undo()}
        className="flex justify-center items-center w-12 h-12 hover:bg-gray-700"
      ><ArrowCircleLeftIcon/></button>
      <button
        onClick={() => History.redo()}
        className="flex justify-center items-center w-12 h-12 hover:bg-gray-700"
      ><ArrowCircleRightIcon/></button>
      <button
        onClick={onSave}
        className="flex justify-center items-center w-12 h-12 hover:bg-gray-700"
      ><SaveIcon/></button>
      {saved && <span className="ml-2">Saved</span>}
    </div>
  )
})

FileControl.displayName = nameof(FileControl)
