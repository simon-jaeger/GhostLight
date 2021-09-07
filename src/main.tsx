import * as mobx from "mobx"
import React from "react"
import ReactDOM from "react-dom"
import {AppView} from "/src/components/AppView"
import {Debugger} from "/src/services/Debugger"

mobx.configure({enforceActions: "never"})

Debugger.run()
Debugger.executeTestCode()

ReactDOM.render(
  <React.StrictMode><AppView/></React.StrictMode>,
  document.getElementById("root"),
)
