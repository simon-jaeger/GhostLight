import * as mobx from "mobx"
import React from "react"
import ReactDOM from "react-dom"
import {Root} from "/src/components/Root"
import {Debugger} from "/src/services/Debugger"

mobx.configure({enforceActions: "never"})

Debugger.run()
Debugger.executeTestCode()

ReactDOM.render(
  <React.StrictMode><Root/></React.StrictMode>,
  document.getElementById("root"),
)
