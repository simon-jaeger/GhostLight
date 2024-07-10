import {
  Actor,
  CollisionEndEvent,
  CollisionStartEvent,
  CollisionType,
  Engine,
  Input,
} from "excalibur"
import {Player} from "/src/actorTypes/Player"

export class Ladder extends Actor {
  player: Player | null = null

  onInitialize(game: Engine) {
    this.body.collisionType = CollisionType.Passive
    this.on("collisionstart", (e: CollisionStartEvent) => {
      if (!(e.other instanceof Player)) return
      this.player = e.other
    })
    this.on("collisionend", (e: CollisionEndEvent) => {
      if (!(e.other instanceof Player)) return
      e.other.body.collisionType = CollisionType.Active
      this.player = null
    })
  }

  onPreUpdate(game: Engine) {
    if (!this.player) return
    const direction = +game.input.keyboard.isHeld(Input.Keys.Down) - +game.input.keyboard.isHeld(Input.Keys.Up)
    this.player.vel.y = this.player.move * direction
    if (!direction) return
    this.player.body.collisionType =
      (this.player.pos.y + this.player.height < this.pos.y + this.height)
        ? CollisionType.Passive
        : CollisionType.Active
  }
}
