interface glScene {
  config: {
    background: string
    width: number
    height: number
  }
  actors: {
    id: string
    type_id: string
    type: string
    texture: string
    resize: "Disable" | "Scale" | "Repeat" | "Slice"
    x: number
    y: number
    width: number
    height: number
    props: { [key: string]: any }
  }[]
}
