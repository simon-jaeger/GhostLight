import {Actor, CollisionType, Engine, PreCollisionEvent, Side} from "excalibur"
import {Player} from "/src/actorTypes/Player"

export class ItemBox extends Actor {
  item = ""

  onInitialize(game: Engine) {
    this.body.collisionType = CollisionType.Fixed
    const item = game.currentScene.actors.find((x) => x.hasTag(this.item))
    if (!item) return
    item.kill()
    this.on("precollision", (e: PreCollisionEvent) => {
      if (!this.item) return
      if (!(e.other instanceof Player)) return
      if (e.other.vel.y >= 0) return
      if (e.side !== Side.Bottom) return
      game.add(item)
      this.graphics.opacity = 0.5
      this.item = ""
    })
  }
}
