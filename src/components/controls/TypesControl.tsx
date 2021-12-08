import React, {useEffect, useState} from "react"
import {observer} from "mobx-react-lite"
import {Type} from "/src/models/Type"
import {Button} from "/src/components/generic/Button"
import {TypesControlDetails} from "/src/components/controls/TypesControlDetails"
import {App} from "/src/services/App"
import {AssetsFs} from "/src/services/FileSystem/AssetsFs"

export const TypesControl = observer(() => {
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (Type.all.length <= 0) setShowDetails(false)
  }, [Type.all.length])

  const typeList = <>
    <div className="grid grid-cols-3">
      {Type.all.map(type => (
        <button
          key={type.name}
          style={{paddingBottom: "100%"}}
          className={`relative ${App.isMode('create') && Type.active.value === type ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => {
            Type.active.value = type
            App.setMode("create")
          }}
        >
          <div
            className="absolute inset-4 bg-center bg-no-repeat bg-contain"
            style={{
              backgroundColor: type.texture.startsWith("#") ? type.texture : "transparent",
              backgroundImage: `url(${AssetsFs.get(type.texture).src})`,
            }}
          ></div>
        </button>
      ))}
    </div>
  </>

  const emptyState =
    <div className="p-4 mx-4 text-center text-gray-400 rounded-lg border-2 border-gray-600 border-dashed">
      Click <em>New</em> or <br/>
      drop an image
    </div>

  return (
    <div className="overflow-y-scroll fixed right-0 top-12 bottom-0 pl-2 w-52 bg-gray-800">
      <header className="grid sticky top-0 z-10 grid-cols-2 gap-4 px-2 py-4 bg-gray-800">
        <Button
          onClick={() => {
            setShowDetails(!showDetails)
          }}
          disabled={!Type.all.length}
        >{showDetails ? "Close" : "Edit"}</Button>
        <Button
          onClick={() => {
            Type.active.value = Type.create()
            App.setMode("create")
            setShowDetails(true)
          }}
        >New</Button>
      </header>

      {Type.all.length ? typeList : emptyState}

      {showDetails  && <TypesControlDetails/>}
      {/*{true && <TypesControlDetails/>}*/}
    </div>
  )
})

TypesControl.displayName = nameof(TypesControl)
