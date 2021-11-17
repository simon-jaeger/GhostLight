import {makeAutoObservable} from "mobx"
import {uClone} from "/src/helpers/utils"

export const Grid = new class cGrid {
  show = true
  sizeX = 16
  sizeY = 16
  static defaults: Readonly<cGrid>

  constructor() {
    cGrid.defaults = Object.freeze(uClone(this))
    makeAutoObservable(this)
  }

  get defaults() {
    return cGrid.defaults
  }
}
