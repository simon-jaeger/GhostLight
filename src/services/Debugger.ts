import Vue from "vue"
import {Config} from "/src/models/Config"

export const Debugger = new class {
  run() {
    Vue.config.silent = true
    Vue.config.productionTip = false
    const debug = {
      Config: Config,
    }
    new Vue({el: "#debug", name: "Debug", data: debug})
  }
}
