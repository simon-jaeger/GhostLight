import {Project} from "/src/services/FileSystem/Project"
import {makeAutoObservable} from "mobx"
import {Assets} from "/src/services/FileSystem/Assets"
import {Actor} from "/src/models/Actor"
import {uImage, uRand, uRange} from "/src/helpers/utils"

export const Debugger = new class {
  active = false
  frames = [performance.now()]
  delta = 16
  fps = 60

  constructor() {
    makeAutoObservable(this)
  }

  run() {
    this.active = true
    Project.isOpen = true
  }

  performance(frame: number) {
    while (this.frames.length > 0 && this.frames[0] <= frame - 1000) {
      this.frames.shift() // only keep frames that happened in the last second
    }
    this.frames.push(frame)
    this.delta = frame - this.frames[this.frames.length - 2]
    this.fps = this.frames.length
  }

  async createManyActors() {
    Assets.map.set("demo.png", {
      key: "demo.png",
      image: await uImage("demo.png"),
    })

    let count = 1024 // 32*32
    // count = 2304 // 48*48
    // count = 4096 // 64*64
    const row = Math.sqrt(count)
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
