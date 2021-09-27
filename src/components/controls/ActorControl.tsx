import React from "react"
import {observer} from "mobx-react-lite"
import {TextField} from "/src/components/generic/TextField"
import {Selection} from "/src/services/Selection"
import {Grid} from "/src/services/Grid"
import {Textures} from "/src/services/Textures"

// TODO: copy id to clipboard on click?

export const ActorControl = observer(() => {
  const actor = Selection.all[0]

  return (
    <div className="fixed top-12 left-0 p-4 w-64 h-full bg-gray-800">
      <form>
        <header className="flex gap-4 mb-4">
          <div
            style={{backgroundImage: `url(${Textures.get(actor.sprite.texture).url})`}}
            className="w-16 h-16 bg-center bg-no-repeat bg-contain"
          ></div>
          <div className="overflow-hidden flex-1">
            <h2 className="truncate">[Anonymous actor]</h2>
            <p className="mb-2 text-gray-400 truncate">ID: {actor.id}</p>
          </div>
        </header>

        <hr className="-mx-4 my-4 border-gray-600"/>
        <fieldset className="grid grid-cols-2 gap-4">
          <TextField
            label="X"
            type="number"
            step={Grid.sizeX}
            value={actor.shape.x}
            onChange={(v) => actor.shape.x = v}
          />
          <TextField
            label="Y"
            type="number"
            step={Grid.sizeY}
            value={actor.shape.y}
            onChange={(v) => actor.shape.y = v}
          />
          <TextField
            label="Width"
            type="number"
            min={Grid.sizeX}
            step={Grid.sizeX}
            value={actor.shape.width}
            onChange={(v) => actor.shape.width = v}
          />
          <TextField
            label="Height"
            type="number"
            min={Grid.sizeY}
            step={Grid.sizeY}
            value={actor.shape.height}
            onChange={(v) => actor.shape.height = v}
          />
        </fieldset>
      </form>
    </div>
  )
})

ActorControl.displayName = nameof(ActorControl)
