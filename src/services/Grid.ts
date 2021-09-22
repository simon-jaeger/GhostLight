import {makeAutoObservable} from "mobx"

export const Grid = new class {
  show = true
  sizeW = 16
  sizeH = 16

  constructor() {
    makeAutoObservable(this)
  }
}
