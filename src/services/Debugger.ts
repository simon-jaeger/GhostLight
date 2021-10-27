import {Project} from "/src/services/FileSystem/Project"
import {makeAutoObservable} from "mobx"
import {Assets} from "/src/services/FileSystem/Assets"
import {Actor} from "/src/models/Actor"
import {uImage, uRange, uRandItem} from "/src/helpers/utils"
import demoScene from "/gitignore/demo/.ghostlight/scenes/level-01.json"

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
    this.loadDemoScene()
    // this.testManyActors()
  }

  performance(frame: number) {
    this.frames = this.frames.filter(x => x > frame - 1000)
    this.frames.unshift(frame)
    this.delta = frame - this.frames[1]
    this.fps = this.frames.length
  }

  async loadDemoScene() {
    const assets = Object.keys(import.meta.glob("/public/*")).map((x) => x.replaceAll("/public/", ""))
    for (const asset of assets) {
      Assets.map.set(asset, {
        key: asset,
        image: await uImage(asset),
      })
    }
    Actor.createMany(demoScene.actors)
  }

  async testManyActors() {
    Assets.map.set("demo.png", {
      key: "demo.png",
      image: await uImage("demo.png"),
    })

    let count = 64 // 8 * 8
    // count = 1024 // 32*32
    // count = 2304 // 48*48
    // count = 4096 // 64*64
    // count = 6400 // 80*80
    const row = Math.sqrt(count)
    Actor.createMany(uRange(count).map((i) => ({
      shape: {
        x: i % row * 32,
        y: Math.floor(i / row) * 32,
        width: 16,
        height: 16,
      },
      sprite: {texture: "#10B981", tiling: false, opacity: 100},
    })))
  }
}
