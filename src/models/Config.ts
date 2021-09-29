import {makeAutoObservable} from "mobx"

export const Config = new class Config {
  name = "untitled_scene"
  background = "#000000"
  width = 800
  height = 800

  constructor() {
    makeAutoObservable(this)
  }
}
