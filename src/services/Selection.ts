import {Actor} from "/src/models/Actor"
import {makeAutoObservable} from "mobx"
import {uToggle} from "/src/helpers/utils"

export const Selection = new class {
  readonly all: Actor[] = []

  constructor() {
    makeAutoObservable(this)
  }

  set(...actors: Actor[]) {
    this.all.splice(0, this.all.length, ...actors)
  }

  toggle(actor: Actor) {
    uToggle(this.all, actor)
  }

  clear() {
    this.all.length = 0
  }
}
