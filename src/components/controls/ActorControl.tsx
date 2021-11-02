import React from "react"
import {observer} from "mobx-react-lite"
import {Field} from "/src/components/generic/Field"
import {Selection} from "/src/services/Selection"
import {Grid} from "/src/models/Grid"
import {AssetsFs} from "/src/services/FileSystem/AssetsFs"
import {Button} from "/src/components/generic/Button"

// TODO: copy id to clipboard on click?

export const ActorControl = observer(() => {
  const actor = Selection.all[0]

  return (
    <div className="fixed left-0 top-12 p-4 w-64 h-full bg-gray-800">
      <form>
        <header className="flex gap-4 mb-4">
          <div
            className="w-16 h-16 bg-center bg-no-repeat bg-contain"
            style={{
              backgroundColor: actor.type.texture.startsWith('#') ? actor.type.texture : 'transparent',
              backgroundImage: `url(${AssetsFs.get(actor.type.texture).src})`,
            }}
          ></div>
          <div className="overflow-hidden flex-1">
            <h2 className="truncate">{ actor.type.name || '[NO TYPE]' }</h2>
            <p className="mb-2 text-gray-400 truncate">ID: {actor.id}</p>
          </div>
        </header>

        <hr className="-mx-4 my-4 bg-gray-600"/>
        <fieldset className="grid grid-cols-2 gap-4">
          <Field
            label="X"
            type="number"
            step={Grid.sizeX}
            value={actor.x}
            onChange={(v) => actor.x = v}
          />
          <Field
            label="Y"
            type="number"
            step={Grid.sizeY}
            value={actor.y}
            onChange={(v) => actor.y = v}
          />
          <Field
            label="Width"
            type="number"
            min={Grid.sizeX}
            step={Grid.sizeX}
            value={actor.width}
            onChange={(v) => actor.width = v}
          />
          <Field
            label="Height"
            type="number"
            min={Grid.sizeY}
            step={Grid.sizeY}
            value={actor.height}
            onChange={(v) => actor.height = v}
          />
        </fieldset>
      </form>
    </div>
  )
})

ActorControl.displayName = nameof(ActorControl)
