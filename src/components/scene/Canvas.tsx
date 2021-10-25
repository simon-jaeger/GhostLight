import React, {useEffect, useRef} from "react"
import {observer} from "mobx-react-lite"
import {Actor} from "/src/models/Actor"
import {Assets} from "/src/services/FileSystem/Assets"
import {Camera} from "/src/models/Camera"
import {Debugger} from "/src/services/Debugger"

export const Canvas = observer(() => {
  const refCanvas = useRef<HTMLCanvasElement>(null)
  const refAnimationFrame = useRef(0)

  function fitToScreen() {
    const canvas = refCanvas.current!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
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
      if (actor.sprite.texture.startsWith("#")) {
        ctx.fillStyle = actor.sprite.texture
        ctx.fillRect(actor.x, actor.y, actor.w, actor.h)
      }
      //////////////////////////////////////////////////////////////////////////
      else if (actor.sprite.tiling) {
        const texture = Assets.get(actor.sprite.texture).image
        ctx.translate(actor.x, actor.y) // set origin to actor origin temporarily. needed for correct pattern tiling.
        ctx.fillStyle = ctx.createPattern(texture, "repeat")!
        ctx.fillRect(0, 0, actor.w, actor.h)
        ctx.translate(-actor.x, -actor.y)
      }
      //////////////////////////////////////////////////////////////////////////
      else {
        const texture = Assets.get(actor.sprite.texture).image
        ctx.drawImage(texture, actor.x, actor.y, actor.w, actor.h)
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
})

Canvas.displayName = nameof(Canvas)
