import React, {useEffect, useRef} from "react"
import {observer} from "mobx-react-lite"
import {Actor} from "/src/models/Actor"
import {Textures} from "/src/services/FileSystem/Textures"
import {Camera} from "/src/models/Camera"
import "fpsmeter"

export const ActorList = observer(() => {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext("2d")!

    function fitToScreen() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      canvas.style.width = canvas.width + "px"
      canvas.style.height = canvas.height + "px"
    }
    fitToScreen()
    window.addEventListener("resize", fitToScreen)

    const meter = new FPSMeter(document.body, {graph: 1, left: "240px"})

    function prepare() {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.translate(Camera.x, Camera.y)
      ctx.scale(Camera.zoom, Camera.zoom)
      ctx.imageSmoothingEnabled = false
    }

    function render() {
      meter.tickStart()
      prepare()

      const actors = Actor.all
      const actorsLength = actors.length
      for (let i = 0; i < actorsLength; i++) {
        const a = actors[i]
        ctx.drawImage(Textures.get(a.sprite.texture).image, a.x, a.y, a.w, a.h)
      }

      meter.tick()
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  }, [])

  return (
    <canvas ref={ref}/>
  )
})

ActorList.displayName = nameof(ActorList)
