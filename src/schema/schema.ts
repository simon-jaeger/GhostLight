import {Actor as _Actor} from "/src/models/Actor"

type Actor = Omit<_Actor, "x" | "y" | "w" | "h" | "xw" | "yh">

export interface GhostLightScene {
  actors: Actor[]
}
