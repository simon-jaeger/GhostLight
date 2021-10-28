import {makeAutoObservable, observable} from "mobx"
import uuid4 from "uuid4"
import {uCollision, uFindLast, uRemove} from "/src/helpers/utils"

export class Actor {
  id = ""
  shape: Shape = {x: 0, y: 0, width: 0, height: 0}
  sprite = {
    texture: "",
    tiling: false,
    opacity: 100,
  }

  // shape getter/setter
  get x() {
    return this.shape.x
  }
  set x(value) {
    this.shape.x = value
  }

  get y() {
    return this.shape.y
  }
  set y(value) {
    this.shape.y = value
  }

  get w() {
    return this.shape.width
  }
  set w(value) {
    this.shape.width = value
  }

  get h() {
    return this.shape.height
  }
  set h(value) {
    this.shape.height = value
  }

  get xw() {
    return this.shape.x + this.shape.width
  }
  get yh() {
    return this.shape.y + this.shape.height
  }

  static readonly all: Actor[] = observable([])

  static create(partial: Partial<Actor>) {
    const actor = makeAutoObservable(new Actor())
    Object.assign(actor, partial)
    actor.id = actor.id || uuid4()
    this.all.push(actor)
    return actor
  }

  static createMany(partials: Partial<Actor>[]) {
    partials.forEach(x => this.create(x))
  }

  static destroy(...actors: Actor[]) {
    uRemove(this.all, ...actors)
  }

  static findByCollision(shape: Point | Shape) {
    return uFindLast(this.all, x => uCollision(x.shape, shape)) ?? null
  }

  static toFront(...toMove:Actor[]) {
    this.destroy(...toMove)
    this.all.push(...toMove)
  }

  static toBack(...toMove:Actor[]) {
    this.destroy(...toMove)
    this.all.unshift(...toMove)
  }
}
