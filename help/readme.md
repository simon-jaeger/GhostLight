# Help

GhostLight is a web based editor for 2d scenes. To use it,
visit https://ghostlight.onrender.com with an up to date version of Google
Chrome.

## Demo game

Here's a reference for how to use GhostLight to create games: <br>

[Live demo](https://ghostlight-excalibur-demo.onrender.com/) <br>
[Source code](https://github.com/simon-jaeger/ghostlight-excalibur-demo)

Try [downloading the source code](https://github.com/simon-jaeger/ghostlight-excalibur-demo)
and opening it in GhostLight to modify it.

## Community

Join the official [Discord server](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbHVWV2FHWVU4Z21fYWxlV2R5UDc1akxaNHUxZ3xBQ3Jtc0tuTWFoQ0JsUU5OUVU3ZVRKX00weU5wQy1kUGlLNl82MDZhakQ5elBZcFJkWE5CcWgzaEJ4RC1POGNzV0gyTGM4NXR6dVhiR0xESHRvbUNZWUt0dlJaRFRqZVlVNWhDR2F5dnJBajE3Y1luSlNkSEY3VQ&q=https%3A%2F%2Fdiscord.gg%2FSCMnEkcFYY)
to ask questions or show off your work. I'm looking forward to seeing you there!

## Keyboard controls

Input | Effect
--- | ---
<kbd>Ctrl</kbd>+<kbd>A</kbd> | Select all
<kbd>Ctrl</kbd>+<kbd>C</kbd> | Copy
<kbd>Ctrl</kbd>+<kbd>X</kbd> | Cut
<kbd>Ctrl</kbd>+<kbd>P</kbd> | Paste
<kbd>Ctrl</kbd>+<kbd>Z</kbd> | Undo
<kbd>Ctrl</kbd>+<kbd>Y</kbd> | Redo
<kbd>Esc</kbd> | Clear selection
<kbd>Delete</kbd> | Delete selected
<kbd>Space</kbd> | Pan camera
<kbd>+</kbd> | Zoom in
<kbd>-</kbd> | Zoom out
<kbd>↑</kbd> <kbd>↓</kbd> <kbd>→</kbd> <kbd>←</kbd> | Move selected

## File structure

GhostLight stores data according to the following structure. When you update an
asset locally, it will automatically be hot reloaded.

```sh

your-project
`-- .ghostlight/
    |-- assets/
    |   |-- linked.png
    |   `-- assets.png
    |-- scenes/
    |   |-- scene-01.json
    |   `-- scene-02.json
    `-- types/
        `-- types.json
```

## Type definitions

```ts
interface glScene {
  config: glConfig
  actors: glActor[]
}

interface glConfig {
  background: string
  width: number
  height: number
}

interface glActor {
  id: string
  type_id: string
  type?: string
  texture?: string
  resize?: glResizeOption
  x: number
  y: number
  width: number
  height: number
  props: { [key: string]: any }
}

interface glType {
  id: string
  name: string
  texture: string
  resize: glResizeOption
  props: {
    id: string
    name: string,
    default: any,
  }[]
}

type glResizeOption = "Disable" | "Scale" | "Repeat" | "Slice"
```

## Parsing example

```ts
import sceneJson from "/.ghostlight/scenes/scene.json?raw"
import typesJson from "/.ghostlight/types/types.json?raw"

parse(sceneJson, typesJson)
export function parse(sceneJson: string, typesJson: string) {
  const scene: glScene = JSON.parse(sceneJson)
  const types: glType[] = JSON.parse(typesJson)
  for (const actor of scene.actors) {
    // denormalize
    const type = types.find(x => x.id === actor.type_id)
    if (!type) throw (`ghostlight: type not found for actor with id: ${actor.id}`)
    actor.type = type.name
    actor.texture = type.texture
    actor.resize = type.resize
    type.props.forEach(p => {
      actor.props[p.name] = actor.props[p.id] ?? p.default
      delete actor.props[p.id]
    })
  }
  return scene
}
```
