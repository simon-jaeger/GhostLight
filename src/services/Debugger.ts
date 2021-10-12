import {Project} from "/src/services/FileSystem/Project"
import {makeAutoObservable} from "mobx"

export const Debugger = new class {
  active = false
  constructor() {
    makeAutoObservable(this)
  }

  run() {
    this.active = true
    Project.isOpen = true
  }
}
