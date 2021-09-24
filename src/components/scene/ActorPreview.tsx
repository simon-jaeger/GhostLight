import React from "react"
import {observer} from "mobx-react-lite"
import {Textures} from "/src/services/Textures"
import {App} from "/src/services/App"
import {Cursor} from "/src/services/Cursor/Cursor"

// TODO: size based on texture

export const ActorPreview = observer(() => {
  if (!App.isMode("create")) return null

  const texture = `url(${Textures.active})`

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        left: Cursor.pos.x,
        top: Cursor.pos.y,
        width: 16,
        height: 16,
        background: texture,
        opacity: 0.5,
      }}
    ></div>
  )
})

ActorPreview.displayName = nameof(ActorPreview)
