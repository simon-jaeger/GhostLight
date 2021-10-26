import React from "react"

interface Props {
  actions: {
    name: string,
    fn: () => void
  }[]
  style?: React.CSSProperties
}

export const Menu = (p: Props) => {
  return (
    <div
      className="absolute z-10 py-1 w-28 bg-gray-900 rounded border border-gray-600 shadow"
      style={p.style}
    >
      {p.actions.map(a => (
        <button
          type="button"
          key={a.name}
          className="px-4 w-full h-8 hover:bg-gray-700"
          onMouseDown={a.fn}
        >{a.name}</button>
      ))}
    </div>
  )
}
