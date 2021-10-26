import React from "react"
import {observer} from "mobx-react-lite"
import {Grid} from "/src/models/Grid"
import {Camera} from "/src/models/Camera"

// TODO: line invisible if grid size not even? fix or lock grid to power of 2
export const GridView = observer(() => {
  const sizeX = Grid.sizeX * Camera.zoom
  const sizeY = Grid.sizeY * Camera.zoom

  const line = devicePixelRatio === 1.5 ? 1 / 1.5 : 1

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: Grid.show ? 0.25 : 0,
        backgroundSize: `${sizeX}px ${sizeY}px`,
        backgroundImage: `
          linear-gradient(to right, white 0 ${line}px, transparent ${line}px),
          linear-gradient(to bottom, white 0 ${line}px, transparent ${line}px)
        `,
      }}
    ></div>
  )
})
GridView.displayName = nameof(GridView)
