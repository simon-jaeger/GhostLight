import Vue from "vue"
import {Actor} from "/src/models/Actor"
import {Cursor} from "/src/services/Cursor/Cursor"
import {App} from "/src/services/App"
import {Selection} from "/src/services/Selection"
import {Grid} from "/src/services/Grid"
import {Textures} from "/src/services/Textures"

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
    // Actor.create({
    //   shape: {
    //     x: 16,
    //     y: 16,
    //     width: 16,
    //     height: 16,
    //   },
    //   texture: {value: "#6B7280", opacity: 100},
    // })
    // Actor.create({
    //   shape: {
    //     x: Grid.sizeX * 2,
    //     y: Grid.sizeY * 2,
    //     width: Grid.sizeX,
    //     height: Grid.sizeY,
    //   },
    //   texture: {value: "#6B7280", opacity: 100},
    // })
    Actor.create({
      shape: {
        x: Grid.sizeX * 4,
        y: Grid.sizeY * 4,
        width: Grid.sizeX,
        height: Grid.sizeY,
      },
      texture: {value: "Player.png", opacity: 100},
    })
    Actor.create({
      shape: {
        x: Grid.sizeX * 6,
        y: Grid.sizeY * 2,
        width: Grid.sizeX,
        height: Grid.sizeY,
      },
      texture: {value: "Wall.png", opacity: 100},
    })
    Selection.set(Actor.all[0])
    //
    Textures.map.set("Player.png", {
      key: "Player.png",
      src: "/Player.png",
      width: 16,
      height: 16,
    })
    Textures.map.set("Wall.png", {
      key: "Wall.png",
      src: "/Wall.png",
      width: 16,
      height: 16,
    })
    Textures.map.set("Key.png", {
      key: "Key.png",
      src: "/Key.png",
      width: 16,
      height: 16,
    })
    Textures.map.set("Lock.png", {
      key: "Lock.png",
      src: "/Lock.png",
      width: 16,
      height: 16,
    })
    Textures.map.set("Potion.png", {
      key: "Potion.png",
      src: "/Potion.png",
      width: 16,
      height: 16,
    })
    Textures.map.set("Skeleton.png", {
      key: "/Skeleton.png",
      src: "/Skeleton.png",
      width: 16,
      height: 16,
    })
    Textures.map.set("Sign.png", {
      key: "Sign.png",
      src: "/Sign.png",
      width: 16,
      height: 16,
    })
    Textures.map.set("Block.png", {
      key: "Block.png",
      src: "/Block.png",
      width: 16,
      height: 16,
    })
    Textures.map.set("Pillar.png", {
      key: "Pillar.png",
      src: "/Pillar.png",
      width: 16,
      height: 48,
    })
    Textures.map.set("Cobblestone.png", {
      key: "Cobblestone.png",
      src: "/Cobblestone.png",
      width: 48,
      height: 48,
    })
    //
  }
}
