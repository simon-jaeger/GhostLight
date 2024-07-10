import {Actor, CollisionType, Engine, Shape, Vector, Input, Circle, Color} from "excalibur"
import {Enemy} from "/src/actorTypes/Enemy"

export class Player extends Actor {
  speed = 64
  canShoot = true

  onInitialize(game: Engine) {
    this.body.collisionType = CollisionType.Active
  }

  onPreUpdate(game: Engine) {
    this.vel.x = this.speed * (+game.input.keyboard.isHeld(Input.Keys.D) - +game.input.keyboard.isHeld(Input.Keys.A))
    this.vel.y = this.speed * (+game.input.keyboard.isHeld(Input.Keys.S) - +game.input.keyboard.isHeld(Input.Keys.W))

    const vShoot = new Vector(0, 0)
    vShoot.x = +game.input.keyboard.isHeld(Input.Keys.Right) - +game.input.keyboard.isHeld(Input.Keys.Left)
    vShoot.y = +game.input.keyboard.isHeld(Input.Keys.Down) - +game.input.keyboard.isHeld(Input.Keys.Up)
    if (vShoot.size && this.canShoot) {
      game.add(this.makeBullet(vShoot))
      this.canShoot = false
      setTimeout(() => this.canShoot = true, 200)
    }
  }

  makeBullet(v: Vector) {
    const bullet = new Actor({
      pos: this.center,
      vel: v.normalize().scaleEqual(128),
      collisionType: CollisionType.Passive,
      collider: Shape.Circle(2),
    })
    bullet.graphics.use(new Circle({radius: 2, color: Color.Yellow}))
    bullet.on("collisionstart", (e) => {
      if (e.other === this) return
      if (e.other instanceof Enemy) e.other.kill()
      bullet.kill()
    })
    return bullet
  }
}
