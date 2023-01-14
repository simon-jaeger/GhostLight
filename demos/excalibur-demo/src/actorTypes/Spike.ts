import {Actor, CollisionStartEvent, CollisionType, Engine} from "excalibur"
import {Player} from "/src/actorTypes/Player"

export class Spike extends Actor {
  onInitialize(game: Engine) {
    this.body.collisionType = CollisionType.Fixed
    this.on("collisionstart", (e: CollisionStartEvent) => {
      if (e.other instanceof Player) e.other.respawn()
    })
  }
}
