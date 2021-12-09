import {Actor} from "/src/models/Actor"
import {Type} from "/src/models/Type"
import {uRange, uSleep, uSum} from "/src/helpers/utils"
import {reaction} from "mobx"
import {Camera} from "/src/services/Camera"
import {Debugger} from "/src/services/Debugger"

export const testPerformance = async () => {
  // setup
  Camera.zoom = 0.25
  Type.destroy(...Type.all)
  const demoType = Type.create({
    name: "Demo",
    texture: "#059669",
    resize: "Scale",
  })
  Type.active.value = demoType
  const scenarios = [4, 256, 1024, 2304, 3136, 4096, 5184, 6400, 7744, 9216]

  // meassuring
  for (const scenario of scenarios) {
    const row = Math.sqrt(scenario)
    Actor.destroy(...Actor.all)
    Actor.createMany(uRange(scenario).map((i) => ({
      x: i % row * 32,
      y: Math.floor(i / row) * 32,
      width: 16,
      height: 16,
      type_id: demoType.id,
    })))
    console.log(`recording fps... [${scenario} actors]`)
    const fps: number[] = []
    await uSleep(2000) // warm up
    const disposer = reaction(() => Debugger.frames, () => fps.push(Debugger.fps))
    await uSleep(10 * 1000) // recording
    disposer()
    console.log("fps recorded:", fps)
    console.log("average: ", uSum(fps) / fps.length)
    console.log("")
  }
}
