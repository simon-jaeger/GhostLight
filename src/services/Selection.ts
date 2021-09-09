import {Actor} from "/src/models/Actor"
import {makeAutoObservable} from "mobx"
import {toggle, wrap} from "/src/helpers/utils"

export const Selection = new class {
  private _all: Actor[] = []

  constructor() {
    makeAutoObservable(this)
  }

  get all() {
    return this._all
  }

  set(actors: Actor | Actor[]) {
    actors = wrap(actors)
    this._all.splice(0, this.all.length, ...actors)
  }

  toggle(actor: Actor) {
    toggle(this.all, actor)
  }

  clear() {
    this._all.length = 0
  }
}
