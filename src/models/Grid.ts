import {makeAutoObservable} from "mobx"

export const Grid = new class {
  show = true
  sizeX = 16
  sizeY = 16

  constructor() {
    makeAutoObservable(this)
  }
}
