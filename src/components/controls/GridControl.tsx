import React from "react"
import {observer} from "mobx-react-lite"
import {Button} from "/src/components/generic/Button"
import {Grid} from "/src/services/Grid"
import {ViewGridIcon, XIcon} from "@heroicons/react/solid"
import {TextField} from "/src/components/generic/TextField"

export const GridControl = observer(() => {
  return (
    <div className="flex fixed bottom-0 right-64 items-center pr-2 h-12 text-gray-300 bg-gray-800">
      <button
        className="flex justify-center items-center w-12 h-12"
        onClick={() => Grid.show = !Grid.show}
      >
        <ViewGridIcon className={!Grid.show ? "text-gray-500" : ""}/>
      </button>
      <TextField
        value={Grid.sizeW}
        onChange={(v) => Grid.sizeW = v}
        type="number"
        min={1}
        style={{width: 60}}
        suffix="W"
      />
      <TextField
        value={Grid.sizeH}
        onChange={(v) => Grid.sizeH = v}
        type="number"
        min={1}
        style={{width: 60}}
        suffix="H"
      />
    </div>
  )
})

GridControl.displayName = nameof(GridControl)
