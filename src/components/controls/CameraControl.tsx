import React from "react"
import {observer} from "mobx-react-lite"
import {Camera} from "/src/models/Camera"
import {MinusSmIcon, PlusSmIcon} from "@heroicons/react/solid"
import {uLast} from "/src/helpers/utils"

export const CameraControl = observer(() => {

  return (
    <div className="flex fixed top-0 right-0 items-center px-4 h-12 text-gray-300 bg-gray-800">
      <button
        className="flex justify-center items-center w-8 h-12 text-gray-400 hover:text-gray-200"
        onClick={() => Camera.zoomOut()}
      >
        <MinusSmIcon/></button>
      <button
        className="w-10 h-12 text-center"
        onClick={() => Camera.reset()}
      >{Camera.zoom * 100}%
      </button>
      <button
        className="flex justify-center items-center w-8 h-12 text-gray-400 hover:text-gray-200"
        onClick={() => Camera.zoomIn()}
      >
        <PlusSmIcon/></button>
    </div>
  )
})

CameraControl.displayName = nameof(CameraControl)
