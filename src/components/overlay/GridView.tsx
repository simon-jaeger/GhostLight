import React from "react"
import {observer} from "mobx-react-lite"
import {Grid} from "/src/models/Grid"
import {Camera} from "/src/models/Camera"
import {uDp} from "/src/helpers/utils"

// TODO: line invisible if grid size not even? fix or lock grid to power of 2
export const GridView = observer(() => {
  const sizeX = Grid.sizeX * Camera.zoom
  const sizeY = Grid.sizeY * Camera.zoom
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: Grid.show ? 0.25 : 0,
        backgroundSize: `${sizeX}px ${sizeY}px`,
        backgroundImage: `
          linear-gradient(to right, white 0 ${ uDp() }px, transparent ${ uDp() }px),
          linear-gradient(to bottom, white 0 ${ uDp() }px, transparent ${ uDp() }px)
        `,
      }}
    ></div>
  )
})
GridView.displayName = nameof(GridView)
