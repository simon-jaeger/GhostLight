import '/src/style.css'
import * as mobx from "mobx"
import React from "react"
import ReactDOM from "react-dom"
import {Root} from "/src/components/Root"
import {Debugger} from "/src/services/Debugger"
import {Keyboard} from "/src/services/Keyboard"

mobx.configure({enforceActions: "never"})
Keyboard.addEventListeners()

Debugger.run()
Debugger.executeTestCode()

ReactDOM.render(
  <React.StrictMode><Root/></React.StrictMode>,
  document.getElementById("root"),
)
