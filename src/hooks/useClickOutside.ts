import React, {useEffect} from "react"

export function useClickOutside(ref: React.RefObject<any>, handler: () => void) {
  function listener(e: MouseEvent) {
    if (ref.current === null) return
    if (!ref.current.contains(e.target as Node)) handler()
  }
  useEffect(() => {
    window.addEventListener("mousedown", listener)
    return () => window.removeEventListener("mousedown", listener)
  }, [ref, handler])
}
