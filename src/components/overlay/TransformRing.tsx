import React from "react"
import {observer} from "mobx-react-lite"
import {Selection} from "/src/services/Selection"
import {App} from "/src/services/App"
import {Cursor} from "/src/services/Cursor/Cursor"

export const TransformRing = observer(() => {
  if (!App.isMode(["select", "resize"])) return null
  if (Selection.all.length !== 1) return null

  const target = Selection.all[0]

  const anchors: { position: string, top: string, left: string }[] = [
    {position: "nw", top: "0%", left: "0%"},
    {position: "ne", top: "0%", left: "100%"},
    {position: "se", top: "100%", left: "100%"},
    {position: "sw", top: "100%", left: "0%"},
  ]

  return (
    <div
      className="absolute ring-1 ring-yellow-500"
      style={{
        left: target.shape.x,
        top: target.shape.y,
        width: target.shape.width,
        height: target.shape.height,
      }}
    >{anchors.map((x, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-white rounded-full ring-1 ring-yellow-500 -translate-x-1/2 -translate-y-1/2 t-2"
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
