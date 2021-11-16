import {makeAutoObservable, runInAction} from "mobx"
import {uClone, uIntersection} from "/src/helpers/utils"
import {Cursor} from "/src/services/Cursor/Cursor"
import {Actor} from "/src/models/Actor"
import uuid4 from "uuid4"

export const Clipboard = new class {
  constructor() {
    makeAutoObservable(this)
  }

  cut(...actors: Actor[]) {
    Actor.destroy(...actors)
    navigator.clipboard.writeText(JSON.stringify(actors))
  }

  copy(...actors: Actor[]) {
    const copies = actors.map((x) => {
      const copy = uClone(x)
      copy.id = uuid4()
      return copy
    })
    navigator.clipboard.writeText(JSON.stringify(copies))
  }

  async paste() {
    let data: Actor[]
    try {
      data = JSON.parse(await navigator.clipboard.readText())
    } catch (e) {
      console.warn("Invalid clipboard data:", e)
      return
    }
    // generate new uuids if overlap exists
    if (uIntersection(data.map((x) => x.id), Actor.all.map((x) => x.id)).length) {
      data.forEach((x) => x.id = uuid4())
    }
    let actors
    runInAction(() => {
      actors = Actor.createMany(data)
      const minX = Math.min(...actors.map((a) => a.x))
      const minY = Math.min(...actors.map((a) => a.y))
      actors.forEach((a) => {
        a.x -= minX - Cursor.pos.x
        a.y -= minY - Cursor.pos.y
      })
    })
    return actors
  }

}
