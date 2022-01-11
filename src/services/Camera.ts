import {autorun, makeAutoObservable} from "mobx"
import {uClone, uFindLast, uLast} from "/src/helpers/utils"
import {ProjectFs} from "/src/services/FileSystem/ProjectFs"

export const Camera = new class {
  x = (256 + 32) * devicePixelRatio
  y = (48 + 32) * devicePixelRatio
  zoom = 3
  private defaults = Object.freeze(uClone(this))
  private zoomLevels = [0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  constructor() {
    makeAutoObservable(this)
    setTimeout(() => autorun(() => {
      if (!ProjectFs.isOpen) this.reset()
    }))
  }

  reset() {
    Object.assign(this, this.defaults)
  }

  zoomIn() {
    this.zoom = this.zoomLevels.find((x) => x > this.zoom) ?? uLast(this.zoomLevels)
  }

  zoomOut() {
    this.zoom = uFindLast(this.zoomLevels, (x) => x < this.zoom) ?? this.zoomLevels[0]
  }
}
