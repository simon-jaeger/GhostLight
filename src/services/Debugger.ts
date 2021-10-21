import {Project} from "/src/services/FileSystem/Project"
import {makeAutoObservable} from "mobx"
import {Textures} from "/src/services/FileSystem/Textures"
import {Actor} from "/src/models/Actor"
import {uImage, uRand, uRange} from "/src/helpers/utils"

export const Debugger = new class {
  active = false
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
    Actor.createMany(uRange(1000).map(() => ({
      shape: {
        x: uRand(0, 64) * 16,
        y: uRand(0, 64) * 16,
        width: 16,
        height: 16,
      },
      sprite: {texture: "demo.png", opacity: 50},
    })))
  }
}
