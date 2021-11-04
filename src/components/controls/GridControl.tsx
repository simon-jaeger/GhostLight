import React from "react"
import {observer} from "mobx-react-lite"
import {Grid} from "/src/models/Grid"
import {ViewGridIcon} from "@heroicons/react/solid"
import {Input} from "/src/components/generic/Input"

export const GridControl = observer(() => {
  return (
    <div className="flex fixed bottom-0 left-0 items-center pr-2 h-12 text-gray-300 bg-gray-800">
      <button
        className="flex justify-center items-center w-12 h-12"
        onClick={() => Grid.show = !Grid.show}
      >
        <ViewGridIcon className={!Grid.show ? "text-gray-500" : ""}/>
      </button>
      <Input
        value={Grid.sizeX}
        onChange={(v) => Grid.sizeX = v}
        type="number"
        min={1}
        style={{width: 60}}
        suffix="X"
      />
      <Input
        value={Grid.sizeY}
        onChange={(v) => Grid.sizeY = v}
        type="number"
        min={1}
        style={{width: 60}}
        suffix="Y"
      />
    </div>
  )
})

GridControl.displayName = nameof(GridControl)
