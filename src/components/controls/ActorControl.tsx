import React from "react"
import {observer} from "mobx-react-lite"
import {Input} from "/src/components/generic/Input"
import {Selection} from "/src/services/Selection"
import {Grid} from "/src/services/Grid"
import {AssetsFs} from "/src/services/FileSystem/AssetsFs"
import {Button} from "/src/components/generic/Button"
import {LinkIcon, XIcon} from "@heroicons/react/solid"
import {App} from "/src/services/App"

export const ActorControl = observer(() => {
  const actor = Selection.all[0]
  const type = actor.getType()

  return (
    <form className="flex fixed bottom-0 left-0 top-12 flex-col w-64 bg-gray-800">

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
          <p
            onClick={() => navigator.clipboard.writeText(actor.id)}
            className="mb-2 text-gray-400 truncate"
            style={{cursor: "copy"}}
            title="Copy ID to clipboard"
          >ID: {actor.id}</p>

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
              label={p.name || " "}
              placeholder={p.default}
              value={actor.props[p.id] ?? null}
              onInput={(v) => { // onInput to prevent losing data if component closed without a change trigger (like enter or blur)
                if (v === "") delete actor.props[p.id]
                else actor.props[p.id] = v
              }}
              debounce={400}
              type={p.type === "number" ? "number" : "text"}
            />
          )

          else if (p.type === "boolean") return (
            <div key={p.id}>
              <label className="mb-2">{p.name}</label>
              <Button
                onClick={() => actor.props[p.id] = !actor.props[p.id]}
                style={{width: "100%"}}
              >{actor.props[p.id] ? "TRUE" : "FALSE"}</Button>
            </div>
          )

          else if (p.type === "link") return (
            <div key={p.id} className="flex items-end">
              <Input
                label={p.name || " "}
                value={actor.props[p.id] ?? null}
                onChange={(v) => actor.props[p.id] = v}
                type="text"
                nullable
                placeholder="Select actor..."
              />
              <Button onClick={() => actor.props[p.id] = null}><XIcon/></Button>
              <Button
                onClick={() => {
                  actor.props[p.id] = null
                  App.setMode("link", {from: actor, prop: p.id})
                }}
              ><LinkIcon/></Button>
            </div>
          )

        })}
      </fieldset>

    </form>
  )
})

ActorControl.displayName = nameof(ActorControl)
