import {Actor, CollisionType, Engine} from "excalibur"
import {Player} from "/src/actorTypes/Player"

export class Info extends Actor {
  text = ""

  onInitialize(game: Engine) {
    this.body.collisionType = CollisionType.Passive
    this.on("collisionstart", (e) => {
      if (e.other instanceof Player) alert(this.text)
    })
  }
}
