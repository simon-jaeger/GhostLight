import * as mobx from "mobx"
import React from "react"
import ReactDOM from "react-dom"
import {App} from "/src/components/App"
import {Debugger} from "/src/services/Debugger"

mobx.configure({enforceActions: "never"})

Debugger.run()
Debugger.executeTestCode()

ReactDOM.render(
  <React.StrictMode><App/></React.StrictMode>,
  document.getElementById("root"),
)
