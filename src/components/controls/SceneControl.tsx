import React, {useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {TextField} from "/src/components/generic/TextField"
import {Config} from "/src/models/Config"
import {Grid} from "/src/services/Grid"
import {Select} from "/src/components/generic/Select"
import {Scene} from "/src/services/Scene"
import {DotsVerticalIcon} from "@heroicons/react/solid"
import {Menu} from "/src/components/generic/Menu"
import {useClickOutside} from "/src/hooks/useClickOutside"
import {Modals} from "/src/services/Modals"
import {ModalSceneNew} from "/src/components/modals/ModalSceneNew"

export const SceneControl = observer(() => {
  const [showMenu, setShowMenu] = useState(false)
  const refMenuTrigger = useRef(null)
  useClickOutside(refMenuTrigger, () => setShowMenu(false))

 async function destroyAndSwitch() {
   // TODO: prevent deleting single remaining scene, maybe change that later
   if (Scene.all.length <= 1) return
   let toLoad = Scene.all[Scene.all.indexOf(Scene.name) - 1] ?? Scene.all[1] // scene before or single remaining
   await Scene.destroy()
   await Scene.load(toLoad)
 }

  return (
    <div className="fixed left-0 top-12 p-4 w-64 h-full bg-gray-800">
      <form>
        <header className="flex">
          <Select
            value={Scene.name}
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
            {name: "Rename", fn: () => console.log("ren")},
            {name: "Delete", fn: () => destroyAndSwitch()},
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

        <hr className="-mx-4 my-4 border-gray-600"/>
        <fieldset className="grid gap-4">
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
