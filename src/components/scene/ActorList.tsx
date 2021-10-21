import React, {useEffect, useRef} from "react"
import {observer} from "mobx-react-lite"
import {Actor} from "/src/models/Actor"
import {ActorView} from "/src/components/scene/ActorView"
import {Textures} from "/src/services/FileSystem/Textures"
import {Camera} from "/src/models/Camera"
import {Selection} from "/src/services/Selection"
import {autorun} from "mobx"

export const ActorList = observer(() => {
  // return (<>{Actor.all.map(a => <ActorView actor={a} key={a.id}/>)}</>)

  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current!
    canvas.width = 10000
    canvas.height = 10000
    const ctx = canvas.getContext("2d")!
    ctx.imageSmoothingEnabled = false

    // shift to allow negative coords
    // canvas.style.marginLeft = -canvas.width / 2 + "px"
    // canvas.style.marginTop = -canvas.height / 2 + "px"

    function prepare() {
      // ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // ctx.translate(canvas.width / 2, canvas.height / 2)
      // ctx.scale(Camera.zoom, Camera.zoom)
    }

    function render() {
      prepare()
      Actor.all.forEach((a) => {
        ctx.drawImage(Textures.get(a.sprite.texture).image, a.x, a.y, a.w, a.h)
      })
      Selection.all.forEach((a) => {
        ctx.strokeStyle = "#F59E0B"
        ctx.lineWidth = 2/Camera.zoom
        ctx.strokeRect(a.x, a.y, a.w, a.h)
      })
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)

  }, [])

  return (
    <canvas ref={ref} className="t-max"/>
  )
})

ActorList.displayName = nameof(ActorList)
