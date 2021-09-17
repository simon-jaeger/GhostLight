import React from "react"
import {observer} from "mobx-react-lite"
import {Grid} from "/src/services/Grid"

export const GridView = observer(() => {
  const sizeW = Grid.sizeW
  const sizeH = Grid.sizeH
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundSize: `${sizeW}px ${sizeH}px`,
        backgroundImage: "radial-gradient(circle, white 2px, transparent 2px)",
        backgroundPositionX: sizeW / 2,
        backgroundPositionY: sizeH / 2,
        opacity: Grid.show ? 0.25 : 0,
      }}
    ></div>
  )
})
GridView.displayName = nameof(GridView)
