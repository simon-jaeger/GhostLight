import React from "react"
import {observer} from "mobx-react-lite"
import {AssetsFs} from "/src/services/FileSystem/AssetsFs"
import {App} from "/src/services/App"

export const TextureControl = observer(() => {
  return (
    <div className="fixed right-0 top-12 w-48 bg-gray-800">
      <div className="grid grid-cols-3">
        {AssetsFs.all.map(a => (
          <button
            key={a.key}
            style={{paddingBottom: "100%"}}
            className={`relative ${AssetsFs.active === a ? "bg-gray-700" : "hover:bg-gray-700"}`}
            onClick={() => {
              AssetsFs.active = a
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
