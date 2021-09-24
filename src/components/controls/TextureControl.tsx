import React from "react"
import {observer} from "mobx-react-lite"
import {Textures} from "/src/services/Textures"
import {App} from "/src/services/App"

export const TextureControl = observer(() => {
  return (
    <div className="fixed left-0 top-12 w-48 bg-gray-800">
      <div className="grid grid-cols-3">
        {Textures.all.map(tx => (
          <button
            key={tx.key}
            style={{paddingBottom: "100%"}}
            className={`relative ${Textures.active === tx ? "bg-gray-700" : "hover:bg-gray-700"}`}
            onClick={() => {
              Textures.active = tx
              App.setMode('create')
            }}
          >
            <div
              className="absolute inset-4 bg-center bg-no-repeat bg-contain"
              style={{backgroundImage: `url(${tx.src})`}}
            ></div>
          </button>
        ))}
      </div>
    </div>
  )
})

TextureControl.displayName = nameof(TextureControl)
