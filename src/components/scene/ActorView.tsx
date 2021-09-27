import React from "react"
import {observer} from "mobx-react-lite"
import {Actor} from "/src/models/Actor"
import {Textures} from "/src/services/Textures"
import {Camera} from "/src/services/Camera"

interface Props {
  actor: Actor
}

export const ActorView = observer(({actor}: Props) => {
  const tx = Textures.get(actor.sprite.texture)
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        left: actor.x * Camera.zoom,
        top: actor.y * Camera.zoom,
        width: actor.w * Camera.zoom,
        height: actor.h * Camera.zoom,
        backgroundImage: `url(${tx.url}`,
        backgroundSize: `${ tx.width * Camera.zoom }px ${ tx.height * Camera.zoom }px`,
        opacity: actor.sprite.opacity / 100,
      }}
    ></div>
  )
})

ActorView.displayName = nameof(ActorView)
