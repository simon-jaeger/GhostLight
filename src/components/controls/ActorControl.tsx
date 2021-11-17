import React from "react"
import {observer} from "mobx-react-lite"
import {Input} from "/src/components/generic/Input"
import {Selection} from "/src/services/Selection"
import {Grid} from "/src/services/Grid"
import {AssetsFs} from "/src/services/FileSystem/AssetsFs"
import {uCapitalize} from "/src/helpers/utils"
import {Button} from "/src/components/generic/Button"

// TODO: copy id to clipboard on click?

export const ActorControl = observer(() => {
  const actor = Selection.all[0]
  const type = actor.type

  return (
    <form className="flex fixed left-0 top-12 bottom-0 flex-col w-64 bg-gray-800">

      <header className="flex gap-4 p-4">
        <div
          className="w-16 h-16 bg-center bg-no-repeat bg-contain"
          style={{
            backgroundColor: type.texture.startsWith("#") ? type.texture : "transparent",
            backgroundImage: `url(${AssetsFs.get(type.texture).src})`,
          }}
        ></div>
        <div className="overflow-hidden flex-1">
          <h2 className="truncate">{type.name || "[NO TYPE]"}</h2>
          <p className="mb-2 text-gray-400 truncate">ID: {actor.id}</p>
        </div>
      </header>

      <hr className="bg-gray-600"/>

      <fieldset className="grid grid-cols-2 gap-4 p-4">
        <Input
          label="X"
          type="number"
          step={Grid.sizeX}
          value={actor.x}
          onChange={(v) => actor.x = v}
        />
        <Input
          label="Y"
          type="number"
          step={Grid.sizeY}
          value={actor.y}
          onChange={(v) => actor.y = v}
        />
        <Input
          label="Width"
          type="number"
          min={Grid.sizeX}
          step={Grid.sizeX}
          value={actor.width}
          onChange={(v) => actor.width = v}
        />
        <Input
          label="Height"
          type="number"
          min={Grid.sizeY}
          step={Grid.sizeY}
          value={actor.height}
          onChange={(v) => actor.height = v}
        />
      </fieldset>

      <hr className="bg-gray-600"/>

      <fieldset className="overflow-y-scroll flex-1 p-4 space-y-4">
        {type.props.map((p) => {

          if (p.type === "string" || p.type === "number") return (
            <Input
              key={p.id}
              label={uCapitalize(p.name)}
              placeholder={p.default}
              value={actor.props[p.id] ?? null}
              onInput={(v) => {
                if (v === null) delete actor.props[p.id]
                else actor.props[p.id] = v
              }}
              debounce={400}
              nullable
              type={p.type === "number" ? "number" : "text"}
            />
          )

          else if (p.type === "boolean") return (
            <div key={p.id}>
              <label className="mb-2">{uCapitalize(p.name)}</label>
              <Button
                onClick={() => actor.props[p.id] = !actor.props[p.id]}
                style={{width: "100%"}}
              >{actor.props[p.id] ? "TRUE" : "FALSE"}</Button>
            </div>
          )

        })}
      </fieldset>

    </form>
  )
})

ActorControl.displayName = nameof(ActorControl)
