import React from "react"
import {observer} from "mobx-react-lite"
import {Textures} from "/src/services/FileSystem/Textures"
import {App} from "/src/services/App"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Camera} from "/src/models/Camera"

// TODO: size based on texture

export const ActorPreview = observer(() => {
  if (!App.isMode("create")) return null

  const tx = Textures.active

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        left: Cursor.pos.x * Camera.zoom,
        top: Cursor.pos.y * Camera.zoom,
        width: tx.width * Camera.zoom,
        height: tx.height * Camera.zoom,
        backgroundImage: `url(${tx.url})`,
        backgroundSize: `${ tx.width * Camera.zoom }px ${ tx.height * Camera.zoom }px`,
        opacity: 0.5,
      }}
    ></div>
  )
})

ActorPreview.displayName = nameof(ActorPreview)
