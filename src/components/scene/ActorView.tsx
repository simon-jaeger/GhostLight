import React from "react"
import {observer} from "mobx-react-lite"
import {Actor} from "/src/models/Actor"
import {Textures} from "/src/services/Textures"

interface Props {
  actor: Actor
}

export const ActorView = observer(({actor}: Props) => {
  const texture = actor.texture.value.startsWith("#")
    ? actor.texture.value
    : `url(${Textures.get(actor.texture.value)})`

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        left: actor.x,
        top: actor.y,
        width: actor.w,
        height: actor.h,
        background: texture,
        opacity: actor.texture.opacity / 100,
      }}
    ></div>
  )
})

ActorView.displayName = nameof(ActorView)
