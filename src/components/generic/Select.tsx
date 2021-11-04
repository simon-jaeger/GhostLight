import React, {useRef, useState} from "react"
import {ChevronDownIcon} from "@heroicons/react/solid"
import {useClickOutside} from "/src/hooks/useClickOutside"

interface Props {
  label?: string
  value: any,
  options: any[],
  onChange?: (newValue) => void
  style?: React.CSSProperties
}

export const Select = (p: Props) => {
  const [open, setOpen] = useState(false)

  function handleChange(value) {
    setOpen(false)
    p.onChange?.(value)
  }

  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false))

  return (
    <div className="relative min-w-0" ref={ref} style={p.style}>
      {p.label &&
      <label htmlFor={p.label} className="pb-2 text-gray-300">{p.label}</label>}
      <button
        type="button"
        id={p.label}
        className="relative truncate pl-2 pr-7 w-full h-8 bg-gray-900 border border-gray-600 hover:border-gray-500 focus:border-gray-500"
        onClick={() => setOpen(!open)}
      >
        {p.value}
        <ChevronDownIcon className="absolute right-1 top-1/2 text-gray-400 -translate-y-1/2"/>
      </button>
      <div
        className="absolute z-20 w-full border-r border-b border-l border-gray-600 shadow"
        style={{visibility: open ? "visible" : "hidden"}}
      >
        {p.options.map((option) =>
          <button
            type="button"
            key={option}
            className="px-2 truncate w-full h-8 bg-gray-900 hover:bg-gray-700 focus:bg-gray-700"
            onClick={() => handleChange(option)}
          >{option}</button>)}
      </div>
    </div>
  )
}
