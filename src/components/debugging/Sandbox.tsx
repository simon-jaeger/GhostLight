import React from "react"
import {observer} from "mobx-react-lite"
import {makeAutoObservable} from "mobx"
import {ProjectFs} from "/src/services/FileSystem/ProjectFs"

const state = makeAutoObservable(new class {
})

export const Sandbox = observer(() => {
  return (
    <div className="absolute inset-0 p-4 bg-gray-800">
      <button onClick={() => ProjectFs.openSample('platformer')}>do</button>
    </div>
  )
})

Sandbox.displayName = nameof(Sandbox)
