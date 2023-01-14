import {Actor, CollisionStartEvent, CollisionType, Engine} from "excalibur"
import {Player} from "/src/actorTypes/Player"

export class Coin extends Actor {
  onInitialize(game: Engine) {
    this.body.collisionType = CollisionType.Passive
    this.on("collisionstart", (e: CollisionStartEvent) => {
      if (e.other instanceof Player) this.kill()
    })
  }
}
