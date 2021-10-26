import {Actor} from "/src/models/Actor"
import {makeAutoObservable} from "mobx"

export const Selection = new class {
  private items: Set<Actor> = new Set()
  rect: Shape = {x: 0, y: 0, width: 100, height: 100}

  constructor() {
    makeAutoObservable(this)
  }

  get all() {
    return Array.from(this.items)
  }

  has(actor: Actor) {
    return this.items.has(actor)
  }

  set(...actors: Actor[]) {
    this.items = new Set(actors)
  }

  toggle(...actors: Actor[]) {
    actors.forEach((a) => {
      if (this.items.has(a)) this.items.delete(a)
      else this.items.add(a)
    })
  }

  clear() {
    this.items.clear()
  }
}
