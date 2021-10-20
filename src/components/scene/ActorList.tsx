import React from "react"
import {observer} from "mobx-react-lite"
import {Actor} from "/src/models/Actor"
import {ActorView} from "/src/components/scene/ActorView"

export const ActorList = observer(() => {
  return (<>{Actor.all.map(a => <ActorView actor={a} key={a.id}/>)}</>)
})

ActorList.displayName=nameof(ActorList)
