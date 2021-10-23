import __definitions__ from "wicg-file-system-access"
import "/src/style.css"
import * as mobx from "mobx"
import React from "react"
import ReactDOM from "react-dom"
import {Root} from "/src/components/Root"
import {Debugger} from "/src/services/Debugger"
import {Keyboard} from "/src/services/Keyboard"
import {DropHandler} from "/src/services/DropHandler"

mobx.configure({enforceActions: "never"})
Keyboard.addEventListeners()
DropHandler.addEventListener()

Debugger.run()
Debugger.createManyActors()

ReactDOM.render(
  <React.StrictMode><Root/></React.StrictMode>,
  document.getElementById("root"),
)
