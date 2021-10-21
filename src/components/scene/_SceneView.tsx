import React, {useEffect, useRef} from "react"
import {observer} from "mobx-react-lite"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Config} from "/src/models/Config"
import {ActorList} from "/src/components/scene/ActorList"

export const SceneView = observer(() => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => Cursor.addEventListeners(ref.current!), [])

  return (
    <div
      ref={ref}
      className="absolute"
      style={{background: Config.background}}
    >
      <ActorList/>
    </div>
  )
})

SceneView.displayName = nameof(SceneView)
