import React, {useEffect, useRef} from "react"
import {observer} from "mobx-react-lite"
import {Actor} from "/src/models/Actor"
import {Assets} from "/src/services/FileSystem/Assets"
import {Camera} from "/src/models/Camera"
import "fpsmeter"
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
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.translate(Camera.x, Camera.y)
    ctx.scale(Camera.zoom, Camera.zoom)
    ctx.imageSmoothingEnabled = false

    // draw
    const actors = Actor.all
    const actorsLength = actors.length
    for (let i = 0; i < actorsLength; i++) {
      const a = actors[i]
      ctx.drawImage(Assets.get(a.sprite.texture).image, a.x, a.y, a.w, a.h)
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
