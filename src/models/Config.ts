import {makeAutoObservable} from "mobx"
import {uClone} from "/src/helpers/utils"

export const Config = new class Config {
  background = "#000000"
  width = 256
  height = 256
  private defaults = Object.freeze(uClone(this))

  getDefaults() {
    return this.defaults
  }

  constructor() {
    makeAutoObservable(this)
  }

  reset() {
    Object.assign(this, this.defaults)
  }
}
