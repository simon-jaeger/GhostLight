import React from "react"
import {observer} from "mobx-react-lite"

export const ZeroLines = observer(() => {
  return (
    <div className="absolute inset-0 ring-1 ring-white ring-opacity-50"></div>
  )
})
ZeroLines.displayName = nameof(ZeroLines)
