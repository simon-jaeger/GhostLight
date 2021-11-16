import React from "react"
import {observer} from "mobx-react-lite"
import {Grid} from "/src/services/Grid"

export const BorderLines = observer(() => {
  return (
    <div
      className="absolute inset-0 border border-[#808080]"
      style={{
        visibility: Grid.show ? "visible" : "hidden",
        marginRight: -1,
        marginBottom: -1,
      }}
    ></div>
  )
})
BorderLines.displayName = nameof(BorderLines)
