import React, {useEffect, useState} from "react"
import {observer} from "mobx-react-lite"
import {Modal} from "/src/components/modals/Modal"
import {Field} from "/src/components/generic/Field"
import {Modals} from "/src/services/Modals"
import {Scene} from "/src/services/FileSystem/Scene"

export const ModalSceneRename = observer(() => {
  const [name, setName] = useState(Scene.name)
  useEffect(() => resetName, [Scene.active])

  async function action() {
    if (name === Scene.name) return onClose()
    await Scene.rename(name + ".json")
    onClose()
  }

  function onClose() {
    resetName()
    Modals.close(ModalSceneRename)
  }

  function resetName() {
    setName(Scene.name)
  }

  return (
    <Modal
      title="Rename scene"
      show={Modals.isOpen(ModalSceneRename)}
      action={{name: "Rename", fn: action}}
      onClose={onClose}
    >
      <Field
        label="New name"
        suffix=".json"
        value={name}
        onChange={setName}
        lowerCase
        kebabCase
        autoFocus
      />
    </Modal>
  )
})
ModalSceneRename.displayName = nameof(ModalSceneRename)
