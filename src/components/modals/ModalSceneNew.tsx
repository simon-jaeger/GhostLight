import React, {useState} from "react"
import {observer} from "mobx-react-lite"
import {Modal} from "/src/components/modals/Modal"
import {TextField} from "/src/components/generic/TextField"
import {Modals} from "/src/services/Modals"
import {Scene} from "/src/services/Scene"

export const ModalSceneNew = observer(() => {
  const [name, setName] = useState(defaultName())

  function defaultName() {
    return Date.now()
  }

  async function action() {
    await Scene.create(name + ".json")
    await Scene.load(name + ".json")
    onClose()
  }

  function onClose() {
    setName(defaultName())
    Modals.close(ModalSceneNew)
  }

  return (
    <Modal
      title="New scene"
      show={Modals.isOpen(ModalSceneNew)}
      action={{name: "Create", fn: action}}
      onClose={onClose}
    >
      <TextField
        label="Name"
        suffix=".json"
        value={name}
        onChange={setName}
        autoFocus
      />
    </Modal>
  )
})
ModalSceneNew.displayName = nameof(ModalSceneNew)
