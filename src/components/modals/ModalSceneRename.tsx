import React, {useEffect, useState} from "react"
import {observer} from "mobx-react-lite"
import {Modal} from "/src/components/modals/Modal"
import {Input} from "/src/components/generic/Input"
import {Modals} from "/src/services/Modals"
import {SceneFs} from "/src/services/FileSystem/SceneFs"

export const ModalSceneRename = observer(() => {
  const [name, setName] = useState(SceneFs.name)
  useEffect(() => resetName, [SceneFs.active])

  async function action() {
    if (name === SceneFs.name) return onClose()
    await SceneFs.rename(name + ".json")
    onClose()
  }

  function onClose() {
    resetName()
    Modals.close(ModalSceneRename)
  }

  function resetName() {
    setName(SceneFs.name)
  }

  return (
    <Modal
      title="Rename scene"
      show={Modals.isOpen(ModalSceneRename)}
      action={{name: "Rename", fn: action}}
      onClose={onClose}
    >
      <Input
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
