import React from "react"
import {observer} from "mobx-react-lite"
import {Grid} from "/src/services/Grid"
import {Camera} from "/src/services/Camera"

export const GridView = observer(() => {
  const sizeW = Grid.sizeW * Camera.zoom
  const sizeH = Grid.sizeH * Camera.zoom
  return (
    <div
      className="absolute inset-0"
      style={{opacity: Grid.show ? 0.25 : 0}}
    >
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="grid"
            width={sizeW}
            height={sizeH}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${sizeW} 0 L 0 0 0 ${sizeH}`}
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>
  )
})
GridView.displayName = nameof(GridView)
