import React, {useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {Menu} from "/src/components/generic/Menu"
import {Selection} from "/src/services/Selection"
import {Actor} from "/src/models/Actor"
import {Clipboard} from "/src/services/Clipboard"
import {ghostlight} from "/package.json"

type action = { name: string, fn: () => void }

export const ContextMenu = observer(() => {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  function onCut() {
    Clipboard.cut(...Selection.all)
    Selection.clear()
  }

  function onCopy() {
    Clipboard.copy(...Selection.all)
  }

  async function onPaste() {
    const pasted = await Clipboard.paste()
    if (pasted) Selection.set(...pasted)
  }

  function onDelete() {
    Actor.destroy(...Selection.all)
    Selection.clear()
  }

  function getActions(): action[] {
    if (Selection.all.length) return [
      {name: "Cut", fn: onCut},
      {name: "Copy", fn: onCopy},
      {name: "Paste", fn: onPaste},
      {name: "Delete", fn: onDelete},
      {name: "To front", fn: () => Actor.toFront(...Selection.all)},
      {name: "To back", fn: () => Actor.toBack(...Selection.all)},
    ]
    else return [
      {name: "Paste", fn: onPaste},
      {name: "Help", fn: () => window.open(ghostlight.help, "_blank")},
    ]
  }

  // event listeners
  useEffect(() => {
    const elScene = document.getElementById("scene")!
    const elOverlay = document.getElementById("overlay")!
    const onContext = (e: MouseEvent) => {
      e.preventDefault()
      setX(e.x)
      setY(e.y)
      setShow(true)
    }
    const hide = () => setShow(false)
    elScene.addEventListener("contextmenu", onContext)
    elOverlay.addEventListener("contextmenu", onContext)
    window.addEventListener("mousedown", hide)
    return () => {
      elScene.removeEventListener("contextmenu", onContext)
      elOverlay.removeEventListener("contextmenu", onContext)
      window.removeEventListener("mousedown", hide)
    }
  }, [])

  // shift position of menu if overflows window
  useEffect(() => {
    if (!show) return
    const shape = ref.current!.children[0].getBoundingClientRect()
    const overflowY = 0 < (shape.y + shape.height) - window.innerHeight
    const overflowX = 0 < (shape.x + shape.width) - window.innerWidth
    if (overflowY) setY(y - shape.height)
    if (overflowX) setX(x - shape.width)
  }, [show])

  return (
    <div ref={ref} className="contents">
      <Menu
        actions={getActions()}
        style={{
          visibility: show ? "visible" : "hidden",
          position: "fixed",
          top: y,
          left: x,
        }}
      />
    </div>
  )
})

ContextMenu.displayName = nameof(ContextMenu)
