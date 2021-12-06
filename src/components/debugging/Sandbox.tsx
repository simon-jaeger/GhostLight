import React, {useEffect, useRef} from "react"
import {observer} from "mobx-react-lite"
import {uImage} from "/src/helpers/utils"
import {drawSliced} from "/src/components/scene/drawSliced"

export const Sandbox = observer(() => {
  const refCanvas = useRef<HTMLCanvasElement>(null)
  const refAnimationFrame = useRef(0)
  const refImage = useRef<HTMLImageElement>(document.createElement("img"))

  function render() {
    const canvas = refCanvas.current!
    const ctx = canvas.getContext("2d")!
    const image = refImage.current

    ctx.imageSmoothingEnabled = false
    ctx.resetTransform()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.scale(4, 4)

    drawSliced(ctx, image, 0, 0, image.width * 4, image.height * 2)

    refAnimationFrame.current = requestAnimationFrame(render)
  }

  useEffect(() => {
    refAnimationFrame.current = requestAnimationFrame(render)
    uImage("/Slice1.png").then((x) => refImage.current = x)
    return () => cancelAnimationFrame(refAnimationFrame.current)
  }, [])

  return (
    <div className="absolute inset-0 p-4 bg-gray-700">
      <canvas
        width={2000}
        height={1000}
        ref={refCanvas}
      ></canvas>
    </div>
  )
})

Sandbox.displayName = nameof(Sandbox)
