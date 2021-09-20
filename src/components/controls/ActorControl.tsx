import React from "react"
import {observer} from "mobx-react-lite"
import {TextField} from "/src/components/generic/TextField"
import {Selection} from "/src/services/Selection"
import {Grid} from "/src/services/Grid"

// TODO: copy id to clipboard on click?

export const ActorControl = observer(() => {
  const actor = Selection.all.length === 1 ? Selection.all[0] : null
  return (
    <div className="fixed top-0 right-0 p-4 w-64 h-full bg-gray-800 border-l border-gray-500">
      {actor && <form>
        <header>
          <h2>[Anonymous actor]</h2>
          <p className="text-gray-400 truncate">ID: {actor.id}</p>
        </header>
        <hr className="-mx-4 my-4 border-gray-600"/>

        <fieldset className="grid grid-cols-2 gap-4">
          <TextField
            label="X"
            type="number"
            step={Grid.sizeW}
            value={actor.shape.x}
            onChange={(v) => actor.shape.x = v}
          />
          <TextField
            label="Y"
            type="number"
            step={Grid.sizeH}
            value={actor.shape.y}
            onChange={(v) => actor.shape.y = v}
          />
          <TextField
            label="Width"
            type="number"
            min={Grid.sizeW}
            step={Grid.sizeW}
            value={actor.shape.width}
            onChange={(v) => actor.shape.width = v}
          />
          <TextField
            label="Height"
            type="number"
            min={Grid.sizeH}
            step={Grid.sizeH}
            value={actor.shape.height}
            onChange={(v) => actor.shape.height = v}
          />
        </fieldset>
        <hr className="-mx-4 my-4 border-gray-600"/>

        <div
          className="grid items-end"
          style={{gridTemplateColumns: "3fr 1fr"}}
        >
          <TextField
            label="Texture"
            value={actor.texture.value}
            onChange={(v) => actor.texture.value = v}
          />
          <TextField
            type="number"
            min={0}
            max={100}
            value={actor.texture.opacity}
            onChange={(v) => actor.texture.opacity = v}
            suffix="%"
          />
        </div>

      </form>}
    </div>
  )
})

ActorControl.displayName = nameof(ActorControl)
