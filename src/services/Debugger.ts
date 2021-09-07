import Vue from "vue"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {App} from "/src/services/App"

export const Debugger = new class {
  run() {
    Vue.config.silent = true
    Vue.config.productionTip = false
    const debug = {
      Actor: Actor.all,
      App: App,
      Cursor: Cursor,
    }
    new Vue({el: "#debug", name: "Debug", data: debug})
  }

  executeTestCode() {
    // @ts-ignore
    window.Actor = Actor
    Actor.create({
      shape: {x: 100, y: 100, width: 50, height: 50},
      texture: "#888",
    })
    Actor.create({
      shape: {x: 200, y: 100, width: 50, height: 50},
      texture: "#888",
    })
  }
}
