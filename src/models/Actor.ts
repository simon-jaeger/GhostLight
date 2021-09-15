import {makeAutoObservable, observable} from "mobx"
import uuid4 from "uuid4"
import {Selection} from "/src/services/Selection"
import {collision, findLast, wrap, pull} from "/src/helpers/utils"

export class Actor {
  id = ""
  shape: Shape = {x: 0, y: 0, width: 0, height: 0}
  texture = {
    value: '',
    opacity: 100,
  }

  private static _all: Actor[] = observable([])

  static get all() {
    return this._all
  }

  static create(attributes: Partial<Actor>) {
    const actor = makeAutoObservable(new Actor())
    Object.assign(actor, attributes)
    actor.id = uuid4()
    Actor.all.push(actor)
    return actor
  }

  static findByCollision(shape: Point | Shape) {
    return findLast(this.all, x => collision(x.shape, shape)) ?? null
  }

  static destroy(actors: Actor | Actor[]) {
    pull(this._all, ...wrap(actors))
  }

  isSelected() {
    return Selection.all.includes(this)
  }
}
