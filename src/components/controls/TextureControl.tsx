import React from "react"
import {observer} from "mobx-react-lite"
import {Assets} from "/src/services/FileSystem/Assets"
import {App} from "/src/services/App"

export const TextureControl = observer(() => {
  return (
    <div className="fixed right-0 top-12 w-48 bg-gray-800">
      <div className="grid grid-cols-3">
        {Assets.all.map(a => (
          <button
            key={a.key}
            style={{paddingBottom: "100%"}}
            className={`relative ${Assets.active === a ? "bg-gray-700" : "hover:bg-gray-700"}`}
            onClick={() => {
              Assets.active = a
              App.setMode('create')
            }}
          >
            <div
              className="absolute inset-4 bg-center bg-no-repeat bg-contain"
              style={{backgroundImage: `url(${a.image.src})`}}
            ></div>
          </button>
        ))}
      </div>
    </div>
  )
})

TextureControl.displayName = nameof(TextureControl)
