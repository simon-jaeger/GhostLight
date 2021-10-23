import React, {useEffect, useRef} from "react"
import {observer} from "mobx-react-lite"
import {Actor} from "/src/models/Actor"
import {Textures} from "/src/services/FileSystem/Textures"
import {Camera} from "/src/models/Camera"
import "fpsmeter"
import {Debugger} from "/src/services/Debugger"

export const ActorList = observer(() => {
  const refCanvas = useRef<HTMLCanvasElement>(null)
  const refAnimationFrame = useRef(0)
  // @ts-ignore
  const meter = new FPSMeter(hidden)

  function fitToScreen() {
    const canvas = refCanvas.current!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.width = canvas.width + "px"
    canvas.style.height = canvas.height + "px"
  }

  function render() {
    // start
    const canvas = refCanvas.current!
    const ctx = canvas.getContext("2d")!
    meter.tickStart()

    // prepare
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.translate(Camera.x, Camera.y)
    ctx.scale(Camera.zoom, Camera.zoom)
    ctx.imageSmoothingEnabled = false

    // draw
    const actors = Actor.all
    const actorsLength = actors.length
    for (let i = 0; i < actorsLength; i++) {
      const a = actors[i]
      ctx.drawImage(Textures.get(a.sprite.texture).image, a.x, a.y, a.w, a.h)
    }

    // end
    meter.tick()
    Debugger.fps = meter.fps
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

ActorList.displayName = nameof(ActorList)
