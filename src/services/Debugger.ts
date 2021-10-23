import {Project} from "/src/services/FileSystem/Project"
import {makeAutoObservable} from "mobx"
import {Textures} from "/src/services/FileSystem/Textures"
import {Actor} from "/src/models/Actor"
import {uImage, uRand, uRange} from "/src/helpers/utils"

export const Debugger = new class {
  active = false
  fps = 60
  constructor() {
    makeAutoObservable(this)
  }

  run() {
    this.active = true
    Project.isOpen = true

    this.createManyActors()
  }

  async createManyActors() {
    Textures.map.set("demo.png", {
      key: "demo.png",
      url: "demo.png",
      width: 16,
      height: 16,
      image: await uImage("demo.png"),
    })
    const row = 32
    const count = row ** 2
    Actor.createMany(uRange(count).map((i) => ({
      shape: {
        x: i % row * 32,
        y: Math.floor(i / row) * 32,
        width: 16,
        height: 16,
      },
      sprite: {texture: "demo.png", opacity: 50},
    })))
  }
}
