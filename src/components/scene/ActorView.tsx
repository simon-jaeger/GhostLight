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
        left: actor.x,
        top: actor.y,
        width: actor.w,
        height: actor.h,
        background: actor.texture.value,
        opacity: actor.texture.opacity / 100,
      }}
    ></div>
  )
})

ActorView.displayName = nameof(ActorView)
