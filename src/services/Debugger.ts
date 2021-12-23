import {ProjectFs} from "/src/services/FileSystem/ProjectFs"
import {makeAutoObservable} from "mobx"
import {AssetsFs} from "/src/services/FileSystem/AssetsFs"
import {uImage} from "/src/helpers/utils"
import testScene from "/tests/project/.ghostlight/scenes/scene.json?raw"
import testSceneTypes from "/tests/project/.ghostlight/types/types.json?raw"
import {SceneFs} from "/src/services/FileSystem/SceneFs"
import {TypesFs} from "/src/services/FileSystem/TypesFs"

if (import.meta.hot) {
  // prevent reload when test scene saved
  import.meta.hot.accept("/tests/project/.ghostlight/scenes/scene.json?raw", (x) => null)
  import.meta.hot.accept("/tests/project/.ghostlight/types/types.json?raw", (x) => null)
}

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
    ProjectFs.isOpen = true
    this.loadDemoScene()
  }

  async loadDemoScene() {
    const assets = Object.keys(import.meta.glob("/public/*")).map((x) => x.replaceAll("/public/", ""))
    for (const asset of assets) {
      // @ts-ignore
      AssetsFs.map.set(asset, await uImage(asset))
    }
    TypesFs.load(testSceneTypes)
    SceneFs.load(testScene)
  }

  performance(frame: number) {
    this.frames = this.frames.filter(x => x > performance.now() - 999)
    this.frames.unshift(frame)
    this.delta = frame - this.frames[1]
    this.fps = this.frames.length
  }
}
