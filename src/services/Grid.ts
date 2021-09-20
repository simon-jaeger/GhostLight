import {makeAutoObservable} from "mobx"

export const Grid = new class {
  show = true
  sizeW = 40
  sizeH = 40

  constructor() {
    makeAutoObservable(this)
  }
}
