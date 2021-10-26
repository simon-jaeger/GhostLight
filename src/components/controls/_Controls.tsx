import React from "react"
import {observer} from "mobx-react-lite"
import {DebugView} from "/src/components/controls/DebugView"
import {ModeControl} from "/src/components/controls/ModeControl"
import {ActorControl} from "/src/components/controls/ActorControl"
import {GridControl} from "/src/components/controls/GridControl"
import {CameraControl} from "/src/components/controls/CameraControl"
import {FileControl} from "/src/components/controls/FileControl"
import {TextureControl} from "/src/components/controls/TextureControl"
import {Selection} from "/src/services/Selection"
import {SceneControl} from "/src/components/controls/SceneControl"
import {Welcome} from "/src/components/controls/Welcome"

export const Controls = observer(() => {
  return (
    <div>
      <DebugView/>
      <div className="box-content fixed left-0 w-64 h-full bg-gray-800 border-r border-gray-600">
        { Selection.all.length ? <ActorControl/> : <SceneControl/> }
      </div>
      <div className="box-content fixed right-0 w-48 h-full bg-gray-800 border-l border-gray-600">
        <TextureControl/>
      </div>
      <div className="box-content fixed top-0 w-full h-12 bg-gray-800 border-b border-gray-600">
        <FileControl/>
        <ModeControl/>
        <CameraControl/>
      </div>
      <div className="box-content fixed bottom-0 w-full h-12 bg-gray-800 border-t border-gray-600">
        <GridControl/>
      </div>

      <Welcome/>
    </div>
  )
})

Controls.displayName = nameof(Controls)
