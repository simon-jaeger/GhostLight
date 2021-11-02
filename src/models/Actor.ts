import {makeAutoObservable, observable, runInAction} from "mobx"
import uuid4 from "uuid4"
import {uCollision, uFindLast, uRemove} from "/src/helpers/utils"
import {Type} from "/src/models/Type"

export class Actor {
  id = ""
  type_id = ""
  x = 0
  y = 0
  width = 0
  height = 0

  get type() {
    return Type.all.find((x) => x.id === this.type_id) ?? new Type()
  }

  get shape(): Shape {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    }
  }
  get xw() {
    return this.x + this.width
  }
  get yh() {
    return this.y + this.height
  }

////////////////////////////////////////////////////////////////////////////////

  static readonly all: Actor[] = observable([])

  static create(partial: Partial<Actor>) {
    const actor = makeAutoObservable(new Actor())
    Object.assign(actor, partial)
    actor.id = actor.id || uuid4()
    this.all.push(actor)
    return actor
  }

  static createMany(partials: Partial<Actor>[]) {
    let created
    runInAction(() => created = partials.map(x => this.create(x)))
    return created
  }

  static destroy(...actors: Actor[]) {
    uRemove(this.all, ...actors)
  }

  static findByCollision(shape: Point | Shape) {
    return uFindLast(this.all, a => uCollision(a.shape, shape)) ?? null
  }

  static toFront(...toMove: Actor[]) {
    this.destroy(...toMove)
    this.all.push(...toMove)
  }

  static toBack(...toMove: Actor[]) {
    this.destroy(...toMove)
    this.all.unshift(...toMove)
  }
}
