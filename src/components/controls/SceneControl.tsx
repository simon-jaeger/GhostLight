import React from "react"
import {observer} from "mobx-react-lite"
import {TextField} from "/src/components/generic/TextField"
import {Config} from "/src/models/Config"
import {Grid} from "/src/services/Grid"
import {Select} from "/src/components/generic/Select"
import {Scenes} from "/src/services/Scenes"

export const SceneControl = observer(() => {
  return (
    <div className="fixed left-0 top-12 p-4 w-64 h-full bg-gray-800">
      <form>
        <fieldset className="grid gap-4">
          <Select
            label="Scene"
            value={Scenes.active.name}
            options={Scenes.all.map(x => x.name)}
            onChange={(v) => Scenes.load(Scenes.find(v)!)}
          />
          <TextField
            label="Background"
            value={Config.background}
            onChange={(v) => Config.background = v}
          />
          <div className="flex gap-4">
            <TextField
              label="Width"
              value={Config.width}
              type="number"
              min={Grid.sizeX}
              step={Grid.sizeX}
              onChange={(v) => Config.width = v}
            />
            <TextField
              label="Height"
              value={Config.height}
              type="number"
              min={Grid.sizeY}
              step={Grid.sizeY}
              onChange={(v) => Config.height = v}
            />
          </div>
        </fieldset>
      </form>
    </div>
  )
})

SceneControl.displayName = nameof(SceneControl)
