import React from "react"
import {observer} from "mobx-react-lite"
import {ModeControl} from "/src/components/controls/ModeControl"
import {ActorControl} from "/src/components/controls/ActorControl"
import {CameraControl} from "/src/components/controls/CameraControl"
import {FileControl} from "/src/components/controls/FileControl"
import {Selection} from "/src/services/Selection"
import {SceneControl} from "/src/components/controls/SceneControl"
import {Welcome} from "/src/components/welcome/Welcome"
import {ContextMenu} from "/src/components/controls/ContextMenu"
import {TypesControl} from "/src/components/controls/TypesControl"

export const Controls = observer(() => {
  return (
    <section id="controls" style={{ zoom: 1}}>
      <div className="box-content fixed left-0 w-64 h-full bg-gray-800 border-r border-gray-600">
        {Selection.all.length === 1 ? <ActorControl/> : <SceneControl/>}
      </div>
      <div className="box-content fixed right-0 w-52 h-full bg-gray-800 border-l border-gray-600">
        <TypesControl/>
      </div>
      <div className="box-content fixed top-0 w-full h-12 bg-gray-800 border-b border-gray-600">
        <FileControl/>
        <ModeControl/>
        <CameraControl/>
      </div>

      <ContextMenu/>

      <Welcome/>
    </section>
  )
})

Controls.displayName = nameof(Controls)
