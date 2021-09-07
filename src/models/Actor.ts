import {makeAutoObservable, observable} from "mobx"
import uuid4 from "uuid4"

export class Actor {
  id = ""
  shape: Shape = {x: 0, y: 0, width: 0, height: 0}
  texture = ""

  static readonly all: Actor[] = observable([])

  static create(attributes: Partial<Actor>) {
    const actor = makeAutoObservable(new Actor())
    Object.assign(actor, attributes)
    actor.id = uuid4()
    Actor.all.push(actor)
    return actor
  }
}
