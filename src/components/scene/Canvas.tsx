import React, {useEffect, useRef} from "react"
import {Actor} from "/src/models/Actor"
import {AssetsFs} from "/src/services/FileSystem/AssetsFs"
import {Camera} from "/src/services/Camera"
import {Debugger} from "/src/services/Debugger"
import {drawSliced} from "/src/components/scene/drawSliced"

export const Canvas = () => {
  const refCanvas = useRef<HTMLCanvasElement>(null)
  const refAnimationFrame = useRef(0)

  function fitToScreen() {
    const canvas = refCanvas.current!
    canvas.width = window.innerWidth * devicePixelRatio
    canvas.height = window.innerHeight * devicePixelRatio
    canvas.style.width = canvas.width + "px"
    canvas.style.height = canvas.height + "px"
  }

  function render(startTime: number) {
    // start
    Debugger.performance(startTime)
    const canvas = refCanvas.current!
    const ctx = canvas.getContext("2d")!

    // prepare
    ctx.resetTransform()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.imageSmoothingEnabled = false
    ctx.translate(Camera.x, Camera.y)
    ctx.scale(Camera.zoom, Camera.zoom)

    // draw
    const actors = Actor.all
    const actorsLength = actors.length
    for (let i = 0; i < actorsLength; i++) {
      const actor = actors[i]
      //////////////////////////////////////////////////////////////////////////
      if (actor.type.texture.startsWith("#")) {
        ctx.fillStyle = actor.type.texture
        ctx.fillRect(actor.x, actor.y, actor.width, actor.height)
      }
      //////////////////////////////////////////////////////////////////////////
      else if (actor.type.resize === "Repeat") {
        const texture = AssetsFs.get(actor.type.texture)
        ctx.translate(actor.x, actor.y) // set origin to actor origin temporarily. needed for correct pattern tiling.
        ctx.fillStyle = ctx.createPattern(texture, "repeat")!
        ctx.fillRect(0, 0, actor.width, actor.height)
        ctx.translate(-actor.x, -actor.y)
      }
      //////////////////////////////////////////////////////////////////////////
      else if (actor.type.resize === "Sliced") {
        const texture = AssetsFs.get(actor.type.texture)
        drawSliced(ctx, texture, actor.x, actor.y, actor.width, actor.height)
      }
      //////////////////////////////////////////////////////////////////////////
      else { // simple image
        const texture = AssetsFs.get(actor.type.texture)
        ctx.drawImage(texture, actor.x, actor.y, actor.width, actor.height)
      }
    }

    // end
    refAnimationFrame.current = requestAnimationFrame(render)
  }

  useEffect(() => {
    fitToScreen()
    window.addEventListener("resize", fitToScreen)
    refAnimationFrame.current = requestAnimationFrame(render)
    return () => {
      window.removeEventListener("resize", fitToScreen)
      cancelAnimationFrame(refAnimationFrame.current)
    }
  }, [])

  return (
    <canvas ref={refCanvas}/>
  )
}
