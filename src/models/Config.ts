import {makeAutoObservable} from "mobx"

export const Config = new class {
  width = 1000
  height = 500
  background = "#000000"

  constructor() {
    makeAutoObservable(this)
  }
}

