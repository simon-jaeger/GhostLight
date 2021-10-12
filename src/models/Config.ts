import {makeAutoObservable} from "mobx"
import {uClone} from "/src/helpers/utils"

export const Config = new class Config {
  background = "#000000"
  width = 256
  height = 256
  readonly #_defaults: Readonly<Config>

  constructor() {
    this.#_defaults = Object.freeze(uClone(this))
    makeAutoObservable(this)
  }

  get defaults() {
    return this.#_defaults
  }

  reset() {
    Object.assign(this, this.#_defaults)
  }
}
