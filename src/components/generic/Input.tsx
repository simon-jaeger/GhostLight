import React, {useEffect, useRef} from "react"
import {uDebounce} from "/src/helpers/utils"

interface Props {
  label?: string
  value: any,
  type?: "text" | "number"
  placeholder?: string
  disabled?: boolean
  min?: number
  max?: number
  step?: number
  nullable?: boolean
  onChange?: (newValue) => void
  onInput?: (newValue) => void
  debounce?: number
  onEnter?: () => void
  autoFocus?: boolean
  suffix?: string
  lowerCase?: boolean
  kebabCase?: boolean
  style?: React.CSSProperties
}

const defaults: Partial<Props> = {
  type: "text",
}

export const Input = (_p: Props) => {
  const p: Props = {...defaults, ..._p}

  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => ref.current!.value = p.value)

  function handleChange() {
    if (!ref.current) return
    let value: string | number | null = ref.current.value
    if (p.nullable && value === "") {
      value = null
    } else if (p.type === "number") {
      value = +value
      if ((p.min !== undefined) && (value < p.min)) value = p.min
      if ((p.max !== undefined) && (value > p.max)) value = p.max
    }
    ref.current!.value = (value === null) ? "" : "" + value
    p.onChange?.(value)
  }
  function handleInput() {
    if (!ref.current) return
    const caret = ref.current.selectionStart
    let value: string | number = ref.current.value
    if (p.lowerCase) value = value.toLowerCase()
    if (p.kebabCase) value = value.replaceAll(" ", "-")
    ref.current.value = "" + value
    p.onInput?.(value)
    if (caret !== null) {
      ref.current.selectionStart = caret
      ref.current.selectionEnd = caret
    }
  }
  useEffect(() => {
    const onChange = p.debounce ? uDebounce(handleChange, p.debounce) : handleChange
    ref.current!.addEventListener("change", onChange)
    const onInput = p.debounce ? uDebounce(handleInput, p.debounce) : handleInput
    ref.current!.addEventListener("input", onInput)
    return () => {
      ref.current?.removeEventListener("change", onChange)
      ref.current?.removeEventListener("input", onInput)
    }
  })
  useEffect(() => {
    if (p.autoFocus) {
      setTimeout(() => ref.current!.focus())
    }
  }, [ref])

  return (
    <div className="relative flex-1">
      {p.label &&
      <label htmlFor={p.label} className="pb-2 text-gray-300">{p.label}</label>}
      <input
        id={p.label}
        ref={ref}
        type={p.type}
        disabled={p.disabled ?? false}
        step={p.step}
        defaultValue={p.value}
        placeholder={p.placeholder}
        onFocus={e => p.autoFocus ? e.currentTarget.select() : null}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (p.onEnter && e.key === "Enter") p.onEnter()
        }}
        className="px-2 w-full h-8 bg-gray-900 border border-gray-600 focus:border-gray-500"
        style={p.style}
      />
      {p.suffix &&
      <div className="flex absolute bottom-0 right-2 items-center h-8 text-gray-400 pointer-events-none">{p.suffix}</div>}
    </div>
  )
}
