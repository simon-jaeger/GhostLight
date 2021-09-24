import React from "react"
import {observer} from "mobx-react-lite"
import {FolderOpenIcon, SaveIcon} from "@heroicons/react/solid"
import {FileSystem} from "/src/services/FileSystem"

export const FileControl = observer(() => {
  return (
    <div className="flex fixed top-0 left-0 h-12 bg-gray-800">
        <button
          onClick={() => FileSystem.open()}
          className="w-12 h-12 flex items-center justify-center hover:bg-gray-700"
        ><FolderOpenIcon/></button>
      <button
        onClick={() => FileSystem.save()}
        className="w-12 h-12 flex items-center justify-center hover:bg-gray-700"
      ><SaveIcon/></button>
    </div>
  )
})

FileControl.displayName = nameof(FileControl)
