import {Actor, Canvas, CollisionType, Vector} from "excalibur"
import {makeGraphics} from "/src/utils/makeGraphics"

export function makeActor(data: glScene["actors"][number], Type: undefined | typeof Actor, assets: Map<string, HTMLImageElement>) {
  const {x, y, width, height} = data
  const img = assets.get(data.texture)
  let graphics: Canvas
  if (!img) graphics = makeGraphics.color(data.texture, width, height)
  else switch (data.resize) {
    default:
    case "Scale":
      graphics = makeGraphics.scale(img, width, height)
      break
    case "Repeat":
      graphics = makeGraphics.repeat(img, width, height)
      break
    case "Slice":
      graphics = makeGraphics.slice(img, width, height)
      break
  }

  let actor: Actor
  if (Type) {
    actor = new Type({x, y, width, height, anchor: Vector.Zero})
    Object.assign(actor, data.props)
  } else {
    actor = new Actor({x, y, width, height, anchor: Vector.Zero})
  }
  actor.body.collisionType = data.props.collisionType ?? CollisionType.Fixed // allow setting collisionType in ghostlight
  actor.graphics.use(graphics, {anchor: Vector.Zero})
  actor.addTag(data.id)

  return actor
}
