import React from "react"
import {observer} from "mobx-react-lite"
import {Camera} from "/src/services/Camera"
import {Selection} from "/src/services/Selection"
import {App} from "/src/services/App"

export const SelectionRectangle = observer(() => {
  if (!App.isMode("dragSelect")) return null
  if (Selection.rect.width === 0) return null
  return (
    <div
      className="absolute bg-green-300 bg-opacity-20 border border-green-300"
      style={{
        left: Selection.rect.x * Camera.zoom,
        top: Selection.rect.y * Camera.zoom,
        width: Selection.rect.width * Camera.zoom,
        height: Selection.rect.height * Camera.zoom,
      }}
    >
    </div>
  )
})
SelectionRectangle.displayName = nameof(SelectionRectangle)
