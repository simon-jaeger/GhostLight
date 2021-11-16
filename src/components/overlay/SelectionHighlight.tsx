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
      className="absolute border border-yellow-500"
      style={{
        left: actor.x * Camera.zoom,
        top: actor.y * Camera.zoom,
        width: actor.width * Camera.zoom + 1,
        height: actor.height * Camera.zoom + 1,
      }}
    >
    </div>
  )
})
SelectionHighlight.displayName = nameof(SelectionHighlight)
