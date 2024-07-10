import {Actor, CollisionStartEvent, CollisionType, Engine} from "excalibur"
import {Player} from "/src/actorTypes/Player"

export class Sign extends Actor {
  text = ''

  onInitialize(game: Engine) {
    this.body.collisionType = CollisionType.Passive
    this.on("collisionstart", (e: CollisionStartEvent) => {
      if (!(e.other instanceof Player)) return
      alert(this.text)
    })
  }
}
