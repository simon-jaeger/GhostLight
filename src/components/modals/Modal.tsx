import React, {useState} from "react"
import ReactDOM from "react-dom"
import {Button} from "/src/components/generic/Button"

interface Props {
  title: string
  children: React.ReactNode
  show?: boolean
  onClose?: () => void
  action?: { name: string, fn: () => void }
}

export const Modal = (p: Props) => {
  if (!p.show) return null
  const [busy, setBusy] = useState(false)

  return ReactDOM.createPortal(
    <div
      className="flex fixed inset-0 z-20 justify-center items-start px-8 py-16 bg-black bg-opacity-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) p.onClose?.()
      }}
    >
      <form
        onSubmit={async (e) => {
          setBusy(true)
          e.preventDefault()
          await p.action?.fn()
          setBusy(false)
        }}
        className="w-[480px] bg-gray-800 rounded border-gray-600 border overflow-hidden shadow"
      >
        <fieldset disabled={busy}>
          <header className="px-4 py-2 bg-gray-900">
            <h2>{p.title}</h2>
          </header>

          <div className="p-4">
            {p.children}
          </div>

          <footer className="flex gap-4 justify-end p-4 bg-gray-800 border-t border-gray-600">
            <Button onClick={p.onClose}>Cancel</Button>
            <Button submit>{p.action?.name}</Button>
          </footer>
        </fieldset>
      </form>
    </div>
    , document.getElementById("modals")!,
  )
}
