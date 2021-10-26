import React from "react"
import {observer} from "mobx-react-lite"
import {Assets} from "/src/services/FileSystem/Assets"
import {App} from "/src/services/App"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Camera} from "/src/models/Camera"

// TODO: size based on texture

export const ActorPreview = observer(() => {
  if (!App.isMode("create")) return null

  const asset = Assets.active

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        left: Cursor.pos.x * Camera.zoom,
        top: Cursor.pos.y * Camera.zoom,
        width: asset.image.width * Camera.zoom,
        height: asset.image.height * Camera.zoom,
        backgroundImage: `url(${asset.image.src})`,
        backgroundSize: `${asset.image.width * Camera.zoom}px ${asset.image.height * Camera.zoom}px`,
        opacity: 0.5,
      }}
    ></div>
  )
})

ActorPreview.displayName = nameof(ActorPreview)
