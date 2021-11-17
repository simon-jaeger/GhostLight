interface Config {
  width: number
  height: number
  background: string
}

interface Actor {
  id: string
  type: string
  type_id: string
  texture: string
  props: object
  x: number
  y: number
  width: number
  height: number
}

interface Type {
  id: string
  name: string
  texture: string
  props: { name: string, id: string, default: any }[]
}

export function glParse(sceneJson: string, typesJson: string) {
  const scene: { config: Config, actors: Actor[]} = JSON.parse(sceneJson)
  const types: Type[] = JSON.parse(typesJson)

  scene.actors.forEach((a) => {
    const type = types.find((x) => x.id === a.type_id)!
    a.type = type.name
    a.texture = type.texture
    type.props.forEach((p) => {
      a.props[p.name] = a.props[p.id] ?? p.default
      delete a.props[p.id]
    })
  })

  return scene
}
