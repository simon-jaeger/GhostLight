import React from "react"
import {observer} from "mobx-react-lite"
import {App} from "/src/services/App"
import {Actor} from "/src/models/Actor"
import {Camera} from "/src/services/Camera"
import {Cursor} from "/src/services/Cursor/Cursor"

type ActorShape = Pick<Actor, "id" | "x" | "y" | "width" | "height">

export const LinkArrows = observer(() => {
  const links: { a: ActorShape, b: ActorShape }[] = []
  for (const actor of Actor.all) {
    for (const prop of actor.getType().props) {
      if (prop.type !== "link") continue
      const a = actor
      const b = Actor.findById(actor.props[prop.id])
      if (!b) continue
      links.push({a, b})
    }
  }
  if (App.isMode("link")) {
    links.push({
      a: App.subMode.from,
      b: {
        id: "",
        x: Cursor.posReal.x,
        y: Cursor.posReal.y,
        width: 0,
        height: 0,
      } as ActorShape,
    })
  }

  return (<>
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0 opacity-50"
        overflow={"visible"}
      >
        <defs>
          <marker
            id="head" orient="auto" markerWidth="2" markerHeight="4"
            refX="1.5" refY="2"
          >
            <path d="M0,0 V4 L2,2 Z" fill="#6EE7B7"/>
          </marker>
        </defs>
        {links.map((l) => {
          return <line
            key={l.a.id + "-" + l.b.id}
            x1={(l.a.x + l.a.width / 2) * Camera.zoom}
            y1={(l.a.y + l.a.height / 2) * Camera.zoom}
            x2={(l.b.x + l.b.width / 2) * Camera.zoom}
            y2={(l.b.y + l.b.height / 2) * Camera.zoom}
            markerEnd="url(#head)"
            stroke="#6EE7B7"
            strokeWidth={4}
          />
        })}
      </svg>
    </>
  )
})

LinkArrows.displayName = nameof(LinkArrows)
