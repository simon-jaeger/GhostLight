import React from "react"
import {observer} from "mobx-react-lite"
import {Camera} from "/src/models/Camera"
import {Selection} from "/src/services/Selection"
import {App} from "/src/services/App"

export const SelectionRectangle = observer(() => {
  if (!App.isMode('dragSelect')) return null
  return (
    <div
      className="absolute bg-yellow-500 bg-opacity-20 border border-yellow-500"
      style={{
        left: Selection.shape.x * Camera.zoom,
        top: Selection.shape.y * Camera.zoom,
        width: Selection.shape.width * Camera.zoom,
        height: Selection.shape.height * Camera.zoom,
      }}
    >
    </div>
  )
})
SelectionRectangle.displayName = nameof(SelectionRectangle)
