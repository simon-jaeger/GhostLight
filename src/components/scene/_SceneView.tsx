import React, {useEffect, useRef} from "react"
import {observer} from "mobx-react-lite"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Config} from "/src/models/Config"
import {Canvas} from "/src/components/scene/Canvas"

export const SceneView = observer(() => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => Cursor.addEventListeners(ref.current!), [])

  return (
    <section
      ref={ref}
      className="absolute"
      style={{background: Config.background}}
    >
      <Canvas/>
    </section>
  )
})

SceneView.displayName = nameof(SceneView)
