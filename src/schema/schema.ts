import {Actor as _Actor} from "/src/models/Actor"
import {Config} from "/src/models/Config"

type Actor = Omit<_Actor, "x" | "y" | "w" | "h" | "xw" | "yh">
type Config = Omit<typeof Config, "defaults" | "reset">

export interface GhostLightScene {
  config: Config
  actors: Actor[]
}
