import {makeAutoObservable} from "mobx"
import {uClone} from "/src/helpers/utils"

export const Camera = new class {
  x = 256 + 32
  y = 48 + 32
  zoom = 4
  private defaults = uClone(this)

  constructor() {
    makeAutoObservable(this)
  }

  reset() {
    Object.assign(this, this.defaults)
  }
}
