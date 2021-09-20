import {makeAutoObservable} from "mobx"

// TODO: zoom on ctrl plus/minus
// TODO: ui control

export const Camera = new class {
  x = 100
  y = 100

  constructor() {
    makeAutoObservable(this)
  }
}
