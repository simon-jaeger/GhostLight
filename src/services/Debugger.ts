import {ProjectFs} from "/src/services/FileSystem/ProjectFs"
import {makeAutoObservable} from "mobx"
import {AssetsFs} from "/src/services/FileSystem/AssetsFs"
import {Actor} from "/src/models/Actor"
import {uImage, uRange} from "/src/helpers/utils"
import demoScene from "/gitignore/demo/.ghostlight/scenes/level-01.json?raw"
import demoSceneTypes from "/gitignore/demo/.ghostlight/types/types.json?raw"
import {SceneFs} from "/src/services/FileSystem/SceneFs"
import {Type} from "/src/models/Type"
import {History} from "/src/services/History"
import {TypesFs} from "/src/services/FileSystem/TypesFs"

import {glParse} from "/src/parser/glParse"
import {Config} from "/src/models/Config"
import {Grid} from "/src/services/Grid"

if (import.meta.hot) {
  // prevent reload when demo scene saved
  import.meta.hot.accept("/gitignore/demo/.ghostlight/scenes/level-01.json?raw", (x) => null)
  import.meta.hot.accept("/gitignore/demo/.ghostlight/types/types.json?raw", (x) => null)
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
    TypesFs.load(demoSceneTypes)
    SceneFs.load(demoScene)
  }

  performance(frame: number) {
    this.frames = this.frames.filter(x => x > performance.now() - 999)
    this.frames.unshift(frame)
    this.delta = frame - this.frames[1]
    this.fps = this.frames.length
  }

  parseTest() {
    const scene = glParse(demoScene, demoSceneTypes)
    console.log(scene.actors[0].id)
    console.log(scene)
  }

}
