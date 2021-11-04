import React, {useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {Input} from "/src/components/generic/Input"
import {Config} from "/src/models/Config"
import {Grid} from "/src/models/Grid"
import {Select} from "/src/components/generic/Select"
import {SceneFs} from "/src/services/FileSystem/SceneFs"
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
    await SceneFs.save()
    const copy = await SceneFs.duplicate()
    await SceneFs.open(copy)
  }

  async function onDestroy() {
    // TODO: prevent deleting single remaining scene, maybe change that later
    if (SceneFs.all.length <= 1) return
    let toLoad = SceneFs.all[SceneFs.all.indexOf(SceneFs.active) - 1] ?? SceneFs.all[1] // scene before or single remaining
    await SceneFs.destroy()
    await SceneFs.open(toLoad)
  }

  return (
    <div className="fixed left-0 top-12 p-4 w-64 h-full bg-gray-800">
      <form>
        <header className="flex">
          <Select
            value={SceneFs.active}
            options={SceneFs.all}
            onChange={(v) => SceneFs.open(v)}
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
            {name: "New scene", fn: () => Modals.open(ModalSceneNew)},
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

        <hr className="-mx-4 my-4 bg-gray-600"/>
        <fieldset className="grid gap-4">
          <Input
            label="Background"
            value={Config.background}
            onChange={(v) => Config.background = v}
          />
          <div className="flex gap-4">
            <Input
              label="Width"
              value={Config.width}
              type="number"
              min={Grid.sizeX}
              step={Grid.sizeX}
              onChange={(v) => Config.width = v}
            />
            <Input
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
