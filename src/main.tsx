import "/src/style.css"
import * as mobx from "mobx"
import React from "react"
import ReactDOM from "react-dom"
import {Root} from "/src/components/Root"
import {Debugger} from "/src/services/Debugger"
import {Keyboard} from "/src/services/Keyboard"
import {DropHandler} from "/src/services/DropHandler"
import {Cursor} from "/src/services/Cursor/Cursor"
import {History} from "/src/services/History"

mobx.configure({enforceActions: "never"})
Debugger.run()

ReactDOM.render(
  <React.StrictMode><Root/></React.StrictMode>,
  document.getElementById("root"),
)

Keyboard.addEventListeners()
DropHandler.addEventListener()
Cursor.addEventListeners(document.getElementById("scene")!)
History.listen()

