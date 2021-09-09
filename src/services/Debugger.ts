import Vue from "vue"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {App} from "/src/services/App"
import {Selection} from "/src/services/Selection"

export const Debugger = new class {
  run() {
    Vue.config.silent = true
    Vue.config.productionTip = false
    const debug = {
      Actor: Actor.all,
      App: App,
      Cursor: Cursor,
      Selection: Selection,
    }
    new Vue({el: "#debug", name: "Debug", data: debug})
  }

  executeTestCode() {
    // @ts-ignore
    window.Actor = Actor
    Actor.create({
      shape: {x: 100, y: 100, width: 50, height: 50},
      texture: "#6B7280",
    })
    Actor.create({
      shape: {x: 200, y: 100, width: 50, height: 50},
      texture: "#6B7280",
    })
    Actor.create({
      shape: {x: 300, y: 100, width: 50, height: 50},
      texture: "#6B7280",
    })
  }
}
