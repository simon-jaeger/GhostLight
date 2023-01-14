import {Actor, CollisionStartEvent, CollisionType, Engine} from "excalibur"
import {Player} from "/src/actorTypes/Player"

export class Apple extends Actor {
  onInitialize(game: Engine) {
    this.body.collisionType = CollisionType.Active
    this.vel.y = -80
    this.vel.x = 60
    this.on("collisionstart", (e: CollisionStartEvent) => {
      if (e.other instanceof Player) this.kill()
    })
  }
}
