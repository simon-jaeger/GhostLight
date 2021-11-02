import React from "react"
import {observer} from "mobx-react-lite"
import {ResizeOption, Type} from "/src/models/Type"
import {Field} from "/src/components/generic/Field"
import {Button} from "/src/components/generic/Button"
import {Select} from "/src/components/generic/Select"
import {AssetsFs} from "/src/services/FileSystem/AssetsFs"

export const TypesControlDetails = observer(() => {
  const type = Type.active.value

  async function onPickImage() {
    const fileHandle = (await window.showOpenFilePicker())[0]
    const file = await fileHandle.getFile()
    const image = await AssetsFs.import(file)
    type.texture = file.name
    type.name = file.name.replace(/\..+/, "")
    type.width = image.width
    type.height = image.height
  }

  function onPickColor() {
    type.texture = "#6B7280"
    type.width = 0
    type.height = 0
  }

  return (
    <form className="fixed top-12 bottom-12 right-52 p-4 w-96 bg-gray-800 border-r border-l border-gray-600">

      <header className="flex gap-4 mb-4">
        <div
          className="w-16 h-16"
          style={{
            backgroundColor: type.texture.startsWith("#") ? type.texture : "transparent",
            backgroundImage: `url(${AssetsFs.get(type.texture).src})`,
            backgroundSize: "contain",
          }}
        ></div>
        <div className="flex flex-1 gap-4 items-end">
          <Field
            label="Name"
            value={type.name}
            onChange={(v) => type.name = v}
          />
          <Button
            onClick={() => {
              let index = Type.all.indexOf(type)
              Type.destroy(type)
              if (index >= Type.all.length) index--
              Type.active.value = Type.all[index] ?? new Type()
            }}
            style={{marginLeft: "auto"}}
          >Delete</Button>
        </div>
      </header>

      <fieldset className="space-y-4">
        <div className="flex items-end">
          <Field
            label="Texture"
            value={type.texture}
            onChange={(v) => type.texture = v}
          />
          <Button onClick={onPickImage}>Image</Button>
          <Button onClick={onPickColor}>Color</Button>
        </div>
        <Select
          label="Resize"
          value={type.resize}
          options={["Disabled", "Scale", "Repeat"] as ResizeOption[]}
          onChange={(v) => type.resize = v}
        />
      </fieldset>

    </form>
  )
})

TypesControlDetails.displayName = nameof(TypesControlDetails)
