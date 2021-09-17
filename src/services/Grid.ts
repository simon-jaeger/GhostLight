import {makeAutoObservable} from "mobx"

export const Grid = new class {
  show = true
  sizeW = 50
  sizeH = 50

  constructor() {
    makeAutoObservable(this)
  }
}
