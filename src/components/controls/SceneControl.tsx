import React, {useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {Field} from "/src/components/generic/Field"
import {Config} from "/src/models/Config"
import {Grid} from "/src/models/Grid"
import {Select} from "/src/components/generic/Select"
import {Scene} from "/src/services/FileSystem/Scene"
import {DotsVerticalIcon} from "@heroicons/react/solid"
import {Menu} from "/src/components/generic/Menu"
import {useClickOutside} from "/src/hooks/useClickOutside"
import {Modals} from "/src/services/Modals"
import {ModalSceneNew} from "/src/components/modals/ModalSceneNew"
import {ModalSceneRename} from "/src/components/modals/ModalSceneRename"

export const SceneControl = observer(() => {
  const [showMenu, setShowMenu] = useState(false)
  const refMenuTrigger = useRef(null)
  useClickOutside(refMenuTrigger, () => setShowMenu(false))

  async function onDuplicate() {
    await Scene.save()
    const copy = await Scene.duplicate()
    await Scene.load(copy)
  }

  async function onDestroy() {
    // TODO: prevent deleting single remaining scene, maybe change that later
    if (Scene.all.length <= 1) return
    let toLoad = Scene.all[Scene.all.indexOf(Scene.active) - 1] ?? Scene.all[1] // scene before or single remaining
    await Scene.destroy()
    await Scene.load(toLoad)
  }

  return (
    <div className="fixed left-0 top-12 p-4 w-64 h-full bg-gray-800">
      <form>
        <header className="flex">
          <Select
            value={Scene.active}
            options={Scene.all}
            onChange={(v) => Scene.load(v)}
            style={{flex: 1}}
          />
          <button
            type="button"
            className="flex justify-center items-center -mr-2 w-8 h-8 text-gray-400 hover:text-gray-200 focus:text-gray-200"
            onClick={() => setShowMenu(!showMenu)}
            ref={refMenuTrigger}
          >
            <DotsVerticalIcon/>
          </button>
        </header>

        <Menu
          actions={[
            {name: "New Scene", fn: () => Modals.open(ModalSceneNew)},
            {name: "Rename", fn: () => Modals.open(ModalSceneRename)},
            {name: "Duplicate", fn: () => onDuplicate()},
            {name: "Delete", fn: () => onDestroy()},
          ]}
          style={{
            visibility: showMenu ? "visible" : "hidden",
            position: "absolute",
            top: 16,
            left: "100%",
            marginLeft: -8,
          }}
        />

        <ModalSceneNew/>
        <ModalSceneRename/>

        <hr className="-mx-4 my-4 border-gray-600"/>
        <fieldset className="grid gap-4">
          <Field
            label="Background"
            value={Config.background}
            onChange={(v) => Config.background = v}
          />
          <div className="flex gap-4">
            <Field
              label="Width"
              value={Config.width}
              type="number"
              min={Grid.sizeX}
              step={Grid.sizeX}
              onChange={(v) => Config.width = v}
            />
            <Field
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
