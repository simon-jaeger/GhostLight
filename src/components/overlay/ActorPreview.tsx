import React from "react"
import {observer} from "mobx-react-lite"
import {App} from "/src/services/App"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Camera} from "/src/models/Camera"
import {Type} from "/src/models/Type"
import {AssetsFs} from "/src/services/FileSystem/AssetsFs"
import {Grid} from "/src/models/Grid"

export const ActorPreview = observer(() => {
  if (!App.isMode("create")) return null
  if (Cursor.down) return null

  const type = Type.active.value
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        left: Cursor.pos.x * Camera.zoom,
        top: Cursor.pos.y * Camera.zoom,
        width: (type.width || Grid.sizeX) * Camera.zoom,
        height: (type.height || Grid.sizeY) * Camera.zoom,
        backgroundColor: type.texture.startsWith('#') ? type.texture : 'transparent',
        backgroundImage: `url(${AssetsFs.get(type.texture).src})`,
        backgroundSize: 'contain',
        opacity: 0.5,
      }}
    ></div>
  )
})

ActorPreview.displayName = nameof(ActorPreview)
