import React, {useEffect, useState} from "react"
import {observer} from "mobx-react-lite"
import {Modal} from "/src/components/modals/Modal"
import {TextField} from "/src/components/generic/TextField"
import {Modals} from "/src/services/Modals"
import {Scene} from "/src/services/Scene"

export const ModalSceneRename = observer(() => {
  const [name, setName] = useState(Scene.name)
  useEffect(() => resetName, [Scene.name])

  async function action() {
    if (name===Scene.name) return onClose()
    await Scene.rename(name + '.json')
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
      title="New scene"
      show={Modals.isOpen(ModalSceneRename)}
      action={{name: "Rename", fn: action}}
      onClose={onClose}
    >
      <TextField
        label="New name"
        suffix=".json"
        value={name}
        onChange={setName}
        autoFocus
      />
    </Modal>
  )
})
ModalSceneRename.displayName = nameof(ModalSceneRename)
