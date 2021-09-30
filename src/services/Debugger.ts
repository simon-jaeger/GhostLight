import Vue from "vue"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {App} from "/src/services/App"
import {Selection} from "/src/services/Selection"
import {Grid} from "/src/services/Grid"
import {Textures} from "/src/services/Textures"
import {Scene} from "/src/services/Scene"
import {Modals} from "/src/services/Modals"

export const Debugger = new class {
  run() {
    Vue.config.silent = true
    Vue.config.productionTip = false
    const debug = {
      Actor: Actor.all,
      App: App,
      Modals:Modals,
    }
    new Vue({el: "#debug", name: "Debug", data: debug})
  }

  executeTestCode() {
    // @ts-ignore
    window.Actor = Actor
    //
    const debugSceneFile = {name: "debug-scene.json"} as FileSystemFileHandle
    // @ts-ignore
    Scene.active = debugSceneFile
    // @ts-ignore
    Scene.map.set(debugSceneFile.name, debugSceneFile)
    //
    Actor.create({
      shape: {
        x: Grid.sizeX * 2,
        y: Grid.sizeY * 2,
        width: Grid.sizeX,
        height: Grid.sizeY,
      },
      sprite: {texture: "Player.png", opacity: 100},
    })
    Actor.create({
      shape: {
        x: Grid.sizeX * 4,
        y: Grid.sizeY * 2,
        width: Grid.sizeX,
        height: Grid.sizeY,
      },
      sprite: {texture: "Wall.png", opacity: 100},
    })
    // Selection.set(Actor.all[0])
    //
    Textures.map.set("Player.png", {
      key: "Player.png",
      url: "/Player.png",
      width: 16,
      height: 16,
    })
    Textures.map.set("Wall.png", {
      key: "Wall.png",
      url: "/Wall.png",
      width: 16,
      height: 16,
    })
    Textures.map.set("Key.png", {
      key: "Key.png",
      url: "/Key.png",
      width: 16,
      height: 16,
    })
    Textures.map.set("Lock.png", {
      key: "Lock.png",
      url: "/Lock.png",
      width: 16,
      height: 16,
    })
    Textures.map.set("Potion.png", {
      key: "Potion.png",
      url: "/Potion.png",
      width: 16,
      height: 16,
    })
    Textures.map.set("Skeleton.png", {
      key: "Skeleton.png",
      url: "/Skeleton.png",
      width: 16,
      height: 16,
    })
    Textures.map.set("Sign.png", {
      key: "Sign.png",
      url: "/Sign.png",
      width: 16,
      height: 16,
    })
    Textures.map.set("Block.png", {
      key: "Block.png",
      url: "/Block.png",
      width: 16,
      height: 16,
    })
    Textures.map.set("Pillar.png", {
      key: "Pillar.png",
      url: "/Pillar.png",
      width: 16,
      height: 48,
    })
    Textures.map.set("Cobblestone.png", {
      key: "Cobblestone.png",
      url: "/Cobblestone.png",
      width: 48,
      height: 48,
    })
    //
  }
}
