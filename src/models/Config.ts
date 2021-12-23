import {makeAutoObservable} from "mobx"
import {uClone} from "/src/helpers/utils"

export const Config = new class cConfig {
  background = "#000000"
  width = 256
  height = 192
  static defaults: Readonly<cConfig>

  constructor() {
    cConfig.defaults = Object.freeze(uClone(this))
    makeAutoObservable(this)
  }

  get defaults() {
    return cConfig.defaults
  }

  reset() {
    Object.assign(this, cConfig.defaults)
  }
}
