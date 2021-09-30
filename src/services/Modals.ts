import {makeAutoObservable} from "mobx"
import React from "react"

export const Modals = new class {
  private set = new Set()

  constructor() {
    makeAutoObservable(this)
  }

  isOpen(modal: React.FunctionComponent) {
    return this.set.has(modal.displayName)
  }

  open(modal: React.FunctionComponent) {
    this.set.add(modal.displayName)
  }

  close(modal: React.FunctionComponent) {
    this.set.delete(modal.displayName)
  }
}
