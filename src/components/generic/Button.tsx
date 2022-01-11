import React from "react"

interface Props {
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
  submit?: boolean
  disabled?: boolean
  title?:string
  style?: React.CSSProperties
}

export const Button = (p: Props) => {
  return (
    <button
      type={p.submit ? "submit" : "button"}
      onClick={p.onClick}
      title={p.title}
      className="relative px-2 h-8 text-center bg-gray-900 border border-gray-600 select-none hover:border-gray-400 focus:border-gray-400"
      disabled={p.disabled}
      style={{
        opacity: p.disabled ? 0.5 : 1,
        ...p.style,
      }}
    >
      {p.children}
    </button>
  )
}
