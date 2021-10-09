import React from "react"
import {observer} from "mobx-react-lite"
import {Textures} from "/src/services/FileSystem/Textures"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Select} from "/src/components/generic/Select"
import {Field} from "/src/components/generic/Field"
import {Config} from "/src/models/Config"
import {Menu} from "/src/components/generic/Menu"
import {Modal} from "/src/components/modals/Modal"

export const DebugView = observer(() => {
  return (
    <div className="fixed left-0 top-1/2 p-4 space-y-4 w-64 h-full bg-gray-800 border-t border-gray-600">
      <h2 className="mb-4">debug view</h2>

      {/*<pre>mode: {App.mode} {App.subMode}</pre>*/}
      {/*<pre>cursor: {JSON.stringify({*/}
      {/*  pos: Cursor.pos,*/}
      {/*  real: Cursor.posReal,*/}
      {/*  movedX: Cursor.movedX,*/}
      {/*  movedY: Cursor.movedY,*/}
      {/*  inertia: Cursor.inertia,*/}
      {/*}, null, 2)}</pre>*/}
      {/*<pre>textures: {JSON.stringify(Textures.all, null, 2)}</pre>*/}
    </div>
  )
})

DebugView.displayName = nameof(DebugView)
