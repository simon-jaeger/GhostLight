import {makeAutoObservable, observable} from "mobx"
import uuid4 from "uuid4"
import {uClone, uCollision, uFindLast, uRemove} from "/src/helpers/utils"
import {Cursor} from "/src/services/Cursor/Cursor"

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
    return partials.map(x => this.create(x))
  }

  static destroy(...actors: Actor[]) {
    uRemove(this.all, ...actors)
  }

  static findByCollision(shape: Point | Shape) {
    return uFindLast(this.all, x => uCollision(x.shape, shape)) ?? null
  }

  static cut(...actors: Actor[]) {
    this.destroy(...actors)
    navigator.clipboard.writeText(JSON.stringify(actors))
  }

  static copy(...actors: Actor[]) {
    const copies = actors.map((x) => {
      const copy = uClone(x)
      copy.id = uuid4()
      return copy
    })
    navigator.clipboard.writeText(JSON.stringify(copies))
  }

  static async paste() {
    let data
    try {
      data = JSON.parse(await navigator.clipboard.readText())
    } catch (e) {
      console.warn("Invalid clipboard data:", e)
      return
    }
    const actors = this.createMany(data)
    const minX = Math.min(...actors.map((a) => a.x))
    const minY = Math.min(...actors.map((a) => a.y))
    actors.forEach((a) => {
      a.x -= minX - Cursor.pos.x
      a.y -= minY - Cursor.pos.y
    })
    this.copy(...actors) // re-copy actors to avoid duplicate ids on multiple paste operations
    return actors
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
