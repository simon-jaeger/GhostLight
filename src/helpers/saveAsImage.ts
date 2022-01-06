import {Camera} from "/src/services/Camera"
import {Config} from "/src/models/Config"
import {Actor} from "/src/models/Actor"
import {AssetsFs} from "/src/services/FileSystem/AssetsFs"
import {drawSliced} from "/src/components/scene/drawSliced"
import {uDownload} from "/src/helpers/utils"
import {SceneFs} from "/src/services/FileSystem/SceneFs"

// refactor together with canvas.tsx at some point
export function saveAsImage() {
  const canvas = document.createElement("canvas")
  canvas.width = Config.width
  canvas.height = Config.height
  const ctx = canvas.getContext("2d")!
  ctx.imageSmoothingEnabled = false

  ctx.fillStyle = Config.background
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (const actor of Actor.all) {
    if (actor.getType().texture.startsWith("#")) {
      ctx.fillStyle = actor.getType().texture
      ctx.fillRect(actor.x, actor.y, actor.width, actor.height)
    } else if (actor.getType().resize === "Repeat") {
      ctx.translate(actor.x, actor.y)
      const tx = AssetsFs.get(actor.getType().texture)
      ctx.fillStyle = ctx.createPattern(tx, "repeat")!
      ctx.fillRect(0, 0, actor.width, actor.height)
      ctx.translate(-actor.x, -actor.y)
    } else if (actor.getType().resize === "Slice") {
      const tx = AssetsFs.get(actor.getType().texture)
      drawSliced(ctx, tx, actor.x, actor.y, actor.width, actor.height)
    } else {
      const tx = AssetsFs.get(actor.getType().texture)
      ctx.drawImage(tx, actor.x, actor.y, actor.width, actor.height)
    }
  }

  uDownload(canvas.toDataURL(), SceneFs.active.split(".")[0])
}
