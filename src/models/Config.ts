import {makeAutoObservable} from "mobx"
import {uClone} from "/src/helpers/utils"

export const Config = new class _Config {
  background = "#000000"
  width = 256
  height = 256
  static defaults: Readonly<_Config>

  constructor() {
    _Config.defaults = Object.freeze(uClone(this))
    makeAutoObservable(this)
  }

  get defaults() {
    return _Config.defaults
  }

  reset() {
    Object.assign(this, _Config.defaults)
  }
}
