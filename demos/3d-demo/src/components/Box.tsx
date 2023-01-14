import React from "react"
import {Mesh} from "three"

interface Props {
  position?: [number, number, number]
  size?: [number, number, number]
  color?: string
  refMesh?: React.Ref<Mesh>
}

export let Box = (p: Props) => {
  return (
    <mesh
      ref={p.refMesh}
      position={p.position ?? [0, 0, 0]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={p.size ?? [1, 1, 1]}/>
      <meshStandardMaterial color={p.color ?? "#64748B"}/>
    </mesh>
  )
}
