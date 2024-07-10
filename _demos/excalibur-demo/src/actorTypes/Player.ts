import {Actor, CollisionType, Engine, Input} from "excalibur"

export class Player extends Actor {
  move = 100
  jump = 200
  startPos = this.body.pos.clone()

  respawn() {
    this.graphics.visible = false
    this.body.setSleeping(true)
    this.pos = this.startPos
    setTimeout(() => {
      this.graphics.visible = true
      this.body.setSleeping(false)
    }, 500)
  }

  onInitialize(game: Engine) {
    this.body.collisionType = CollisionType.Active
  }

  onPreUpdate(game: Engine) {
    this.vel.x = this.move * (+game.input.keyboard.isHeld(Input.Keys.Right) - +game.input.keyboard.isHeld(Input.Keys.Left))
    if (game.input.keyboard.wasPressed(Input.Keys.Space)) this.vel.y = -this.jump
  }

  onPostUpdate(game: Engine) {
    if (this.pos.y > game.getWorldBounds().height) this.respawn()
  }
}
