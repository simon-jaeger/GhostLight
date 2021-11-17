import React from "react"
import {observer} from "mobx-react-lite"
import {Selection} from "/src/services/Selection"
import {App} from "/src/services/App"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Camera} from "/src/services/Camera"

export const TransformRing = observer(() => {
  if (!App.isMode("select", "resize")) return null
  if (Selection.all.length !== 1) return null

  const target = Selection.all[0]
  if (target.type.resize === "Disabled") return null

  const anchors: { position: string, top: string, left: string }[] = [
    {position: "nw", top: "0%", left: "0%"},
    {position: "ne", top: "0%", left: "100%"},
    {position: "se", top: "100%", left: "100%"},
    {position: "sw", top: "100%", left: "0%"},
  ]

  return (
    <div
      className="absolute"
      style={{
        left: target.x * Camera.zoom,
        top: target.y * Camera.zoom,
        width: target.width * Camera.zoom,
        height: target.height * Camera.zoom,
      }}
    >{anchors.map((x, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-white rounded-full ring-1 ring-green-300 -translate-x-1/2 -translate-y-1/2 t-1"
        style={{
          top: x.top,
          left: x.left,
          cursor: x.position + "-resize",
          pointerEvents: Cursor.down ? "none" : "auto",
        }}
        onMouseDown={() => App.setMode("resize", x.position)}
      />
    ))}
    </div>
  )
})

TransformRing.displayName = nameof(TransformRing)
