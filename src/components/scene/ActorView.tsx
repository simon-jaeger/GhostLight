import React from "react"
import {observer} from "mobx-react-lite"
import {Actor} from "/src/models/Actor"

interface Props {
  actor: Actor
}

export const ActorView = observer(({actor}: Props) => {
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        left: actor.shape.x,
        top: actor.shape.y,
        width: actor.shape.width,
        height: actor.shape.height,
        background: actor.texture.value,
        opacity: actor.texture.opacity / 100,
      }}
      className={`${actor.isSelected() && "ring-1 ring-yellow-500"}`}
    ></div>
  )
})

ActorView.displayName = nameof(ActorView)
