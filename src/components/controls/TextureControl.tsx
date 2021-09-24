import React from "react"
import {observer} from "mobx-react-lite"
import {TextField} from "/src/components/generic/TextField"
import {Selection} from "/src/services/Selection"
import {Grid} from "/src/services/Grid"
import {Textures} from "/src/services/Textures"
import {Button} from "/src/components/generic/Button"
import {App} from "/src/services/App"

export const TextureControl = observer(() => {
  return (
    <div className="fixed left-0 top-12 w-48 bg-gray-800">
      <div className="grid grid-cols-3">
        {Textures.all.map(t => (
          <button
            key={t[0]}
            style={{paddingBottom: "100%"}}
            className={`relative ${Textures.active === t[0] ? "bg-gray-700" : "hover:bg-gray-700"}`}
            onClick={() => {
              Textures.active = t[0]
              App.setMode('create')
            }}
          >
            <div
              className="absolute inset-4 bg-center bg-no-repeat bg-contain"
              style={{backgroundImage: `url(${t[1]})`}}
            ></div>
          </button>
        ))}
      </div>
    </div>
  )
})

TextureControl.displayName = nameof(TextureControl)
