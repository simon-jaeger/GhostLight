import {Actor, CollisionType, Engine} from "excalibur"
import {Player} from "/src/actorTypes/Player"

export class Enemy extends Actor {
  onInitialize(game: Engine) {
    this.body.collisionType = CollisionType.Passive
  }
}
