import React from "react"
import {observer} from "mobx-react-lite"
import {Actor} from "/src/models/Actor"
import {Textures} from "/src/services/FileSystem/Textures"
import {Camera} from "/src/models/Camera"

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
        transform:`translateX(${actor.x * Camera.zoom}px) translateY(${actor.y * Camera.zoom}px)`,
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
