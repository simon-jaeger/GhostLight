import React from "react"

interface Props {
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}

export const Button = (p: Props) => {
  return (
    <button
      type="button"
      onClick={p.onClick}
      className="px-2 h-8 bg-gray-900 border border-gray-600 hover:border-gray-400"
    >
      {p.children}
    </button>
  )
}
