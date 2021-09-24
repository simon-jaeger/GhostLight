import {makeAutoObservable} from "mobx"
import {uClone} from "/src/helpers/utils"

export const Camera = new class {
  x = 240
  y = 80
  zoom = 4
  private defaults = uClone(this)

  constructor() {
    makeAutoObservable(this)
  }

  reset() {
    Object.assign(this, this.defaults)
  }
}
