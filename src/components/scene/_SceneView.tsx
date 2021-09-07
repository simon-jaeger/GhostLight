import React, {useEffect, useRef} from "react"
import {observer} from "mobx-react-lite"
import {Actor} from "/src/models/Actor"
import {ActorView} from "/src/components/scene/ActorView"
import {Cursor} from "/src/services/Cursor/Cursor"

export const SceneView = observer(() => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => Cursor.addEventListeners(ref.current!), [])

  return (
    <div
      ref={ref}
      className="absolute inset-0"
    >
      <div
        style={{width: 99999, height: 99999}}
        className="absolute inset-0 ring-1 ring-white ring-opacity-50 pointer-events-none"
      >
        {Actor.all.map(a => <ActorView actor={a} key={a.id}/>)}
      </div>
    </div>
  )
})
SceneView.displayName = nameof(SceneView)
