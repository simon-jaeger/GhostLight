import React, {useState} from "react"
import {observer} from "mobx-react-lite"
import {CustomPropType, ResizeOption, Type} from "/src/models/Type"
import {Button} from "/src/components/generic/Button"
import {Select} from "/src/components/generic/Select"
import {AssetsFs} from "/src/services/FileSystem/AssetsFs"
import {uRemove} from "/src/helpers/utils"
import {Input} from "/src/components/generic/Input"
import {ColorSwatchIcon, PhotographIcon, XIcon} from "@heroicons/react/solid"
import {ProjectFs} from "/src/services/FileSystem/ProjectFs"

export const TypesControlDetails = observer(() => {
  const [newPropName, setNewPropName] = useState("")

  const type = Type.active.value

  function onDestroy() {
    if (!window.confirm(`Really delete [${type.name}]? This action cannot be undone.`)) return
    let index = Type.all.indexOf(type)
    Type.destroy(type)
    if (index >= Type.all.length) index--
    Type.active.value = Type.all[index] ?? new Type()
    if (!type.texture.startsWith("#")) AssetsFs.destroy(type.texture)
  }

  async function onPickImage() {
    // @ts-ignore
    const fileHandle = (await window.showOpenFilePicker({startIn: ProjectFs.assetsDirHandle}))[0]
    const file = await fileHandle.getFile()
    const image = await AssetsFs.import(file)
    type.texture = file.name
    type.name = file.name.replace(/\..+/, "")
    type.width = image.width
    type.height = image.height
  }

  function onPickColor(e: React.ChangeEvent) {
    type.texture = e.target["value"]
    type.width = 0
    type.height = 0
  }

  function onAddProp() {
    type.addProp(newPropName)
    setNewPropName("")
  }

  return (
    <form className="flex fixed bottom-0 top-12 right-52 flex-col w-96 bg-gray-800 border-r border-l border-gray-600">

      {/*common settings*/}
      <section className="p-4">
        <header className="flex gap-4 mb-4">
          <div
            className="w-16 h-16 bg-center bg-no-repeat bg-contain"
            style={{
              backgroundColor: type.texture.startsWith("#") ? type.texture : "transparent",
              backgroundImage: `url(${AssetsFs.get(type.texture).src})`,
            }}
          ></div>
          <div className="flex flex-1 gap-4 items-end">
            <Input
              label="Name"
              value={type.name}
              onChange={(v) => type.name = v}
            />
            <Button
              onClick={onDestroy}
              style={{marginLeft: "auto"}}
            >Delete</Button>
          </div>
        </header>

        <fieldset className="space-y-4">
          <div className="flex items-end">
            <Input
              label="Texture"
              value={type.texture}
              onChange={(v) => type.texture = v}
            />
            <Button onClick={onPickImage}>
              <PhotographIcon/>
            </Button>
            <Button>
              <ColorSwatchIcon/>
              <input
                className="absolute inset-0 mt-1 w-full h-full opacity-0 cursor-pointer"
                id="config-background"
                type="color"
                onChange={onPickColor}
              />
            </Button>

          </div>
          <Select
            label="Resize"
            value={type.resize}
            options={["Disable", "Scale", "Repeat", "Slice"] as ResizeOption[]}
            onChange={(v) => type.resize = v}
          />
        </fieldset>
      </section>
      <hr className="bg-gray-600"/>

      {/*custom props*/}
      <section className="overflow-y-scroll flex-1">
        <header className="flex sticky top-0 z-10 p-4 bg-gray-800">
          <Input
            value={newPropName}
            placeholder="Add custom prop"
            onInput={setNewPropName}
            onEnter={onAddProp}
          />
          <Button onClick={onAddProp}>Add</Button>
        </header>
        <fieldset className="px-4 pb-4 space-y-4">
          {type.props.map((p) => (
            <div key={p.id}>
              <div className="flex justify-start">
                <Input
                  value={p.name}
                  onChange={(v) => p.name = v}
                />
                <Select
                  value={p.type}
                  options={["string", "number", "boolean", "link"] as CustomPropType[]}
                  onChange={(v) => p.type = v}
                  style={{width: 96}}
                />
                <button
                  type="button"
                  className="flex justify-center items-center -mr-1 w-8 h-8 text-gray-400 hover:text-gray-200 focus:text-gray-200"
                  onClick={() => uRemove(type.props, p)}
                >
                  <XIcon/>
                </button>
              </div>
              {(p.type === "string" || p.type === "number") &&
              <Input
                placeholder="No default value"
                value={p.default}
                onChange={(v) => p.default = v}
                nullable
                type={p.type === "number" ? "number" : "text"}
              />}
            </div>
          ))}
        </fieldset>
      </section>

    </form>
  )
})

TypesControlDetails.displayName = nameof(TypesControlDetails)
