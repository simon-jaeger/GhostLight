import React, {useState} from "react"
import {observer} from "mobx-react-lite"
import {Modal} from "/src/components/modals/Modal"
import {Input} from "/src/components/generic/Input"
import {Modals} from "/src/services/Modals"
import {SceneFs} from "/src/services/FileSystem/SceneFs"

export const ModalSceneNew = observer(() => {
  const [name, setName] = useState('new-scene')

  async function action() {
    const created = await SceneFs.create(name + ".json")
    await SceneFs.open(created)
    onClose()
  }

  function onClose() {
    setName('new-scene')
    Modals.close(ModalSceneNew)
  }

  return (
    <Modal
      title="New scene"
      show={Modals.isOpen(ModalSceneNew)}
      action={{name: "Create", fn: action}}
      onClose={onClose}
    >
      <Input
        label="Name"
        suffix=".json"
        value={name}
        onChange={setName}
        autoFocus
        lowerCase
        kebabCase
        type="text"
      />
    </Modal>
  )
})
ModalSceneNew.displayName = nameof(ModalSceneNew)
