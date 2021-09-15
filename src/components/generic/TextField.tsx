import React, {useEffect, useRef} from "react"

interface Props {
  label?: string
  value: any,
  type?: "text" | "number"
  max?: number
  min?: number
  onChange?: (newValue) => void
  suffix?: string
  style?: React.CSSProperties
}

export const TextField = (p: Props) => {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => ref.current!.value = p.value)
  useEffect(() => ref.current!.addEventListener("change", () => {
    let value: string | number = ref.current!.value
    if (p.type === "number") {
      value = +value
      if ((p.max !== undefined) && (value > p.max)) value = p.max
      if ((p.min !== undefined) && (value < p.min)) value = p.min
    }
    ref.current!.value = "" + value
    p.onChange?.(value)
  }), [])

  return (
    <div className="relative">
      {p.label &&
      <label htmlFor={p.label} className="pb-2 text-gray-300">{p.label}</label>}
      <input
        id={p.label}
        ref={ref}
        type={p.type ?? "text"}
        defaultValue={p.value}
        className="px-2 w-full h-8 bg-gray-900 border border-gray-500 focus:border-gray-400"
        style={p.style}
      />
      {p.suffix &&
      <div className="flex absolute bottom-0 right-2 items-center h-8 text-gray-400 pointer-events-none">{p.suffix}</div>}
    </div>
  )
}
