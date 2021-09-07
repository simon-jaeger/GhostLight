import React, {useEffect, useRef} from "react"
import {observer} from "mobx-react-lite"

interface Props {
  label: string
  value: any,
  type?: "text" | "number"
  onChange?: (newValue) => void
}

export const TextField = observer((p: Props) => {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => ref.current!.value = p.value)
  useEffect(() => ref.current!.addEventListener("change", () => {
    p.onChange?.(p.type === "number" ? +ref.current!.value : ref.current!.value)
  }), [])

  return (
    <div>
      <label htmlFor={p.label} className="pb-2 text-gray-300">{p.label}</label>
      <input
        id={p.label}
        ref={ref}
        type={p.type ?? "text"}
        defaultValue={p.value}
        className="px-2 w-full h-8 bg-gray-900 border border-gray-500 focus:border-gray-400"
      />
    </div>
  )
})

TextField.displayName = nameof(TextField)
