import React from "react"
import {observer} from "mobx-react-lite"
import {Camera} from "/src/services/Camera"
import {Actor} from "/src/models/Actor"

interface Props {
  actor: Actor
}

export const SelectionHighlight = observer(({actor}: Props) => {
  return (
    <div
      className="absolute bg-green-300 bg-opacity-10 border border-green-300 ring-1 ring-green-300"
      style={{
        left: actor.x * Camera.zoom,
        top: actor.y * Camera.zoom,
        width: actor.width * Camera.zoom,
        height: actor.height * Camera.zoom,
      }}
    >
    </div>
  )
})
SelectionHighlight.displayName = nameof(SelectionHighlight)
