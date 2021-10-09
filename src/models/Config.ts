import {makeAutoObservable} from "mobx"
import {uClone} from "/src/helpers/utils"

export const Config = new class Config {
  background = "#000000"
  width = 256
  height = 256
  defaults = Object.freeze(uClone(this))

  constructor() {
    makeAutoObservable(this)
  }

  reset() {
    Object.assign(this, this.defaults)
  }
}
