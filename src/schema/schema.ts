import {Actor as _Actor} from "/src/models/Actor"
import {Config} from "/src/models/Config"

type Actor = Omit<_Actor, "x" | "y" | "w" | "h" | "xw" | "yh">
type Config = typeof Config

export interface GhostLightScene {
  config: Config
  actors: Actor[]
}
