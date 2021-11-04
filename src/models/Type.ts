import {makeAutoObservable, observable, reaction, runInAction} from "mobx"
import {uRemove} from "/src/helpers/utils"
import uuid4 from "uuid4"

// TODO:  maybe take a step back with the whole json shema thing too. demo project instead?
// TODO: for the demo game, join actor and type on id to embed type props in actor and add names props after resolving via prop.id (kinda sql-like).

export type ResizeOption = "Disabled" | "Scale" | "Repeat"
export type CustomPropType = "string" | "number" | "boolean"
export type CustomProp = {
  id: string
  name: string,
  type: CustomPropType,
  default: any,
}

export class Type {
  id = ""
  name = ""
  width = 0
  height = 0
  texture = "#6B7280"
  resize: ResizeOption = "Disabled"
  props: CustomProp[] = []

  addProp(name: string) {
    const prop: CustomProp = {
      id: uuid4(),
      name: name.trim() || "newProp",
      type: "string",
      default: null,
    }
    while (this.props.find((x) => x.name === prop.name)) prop.name += "_"
    this.props.push(prop)
  }

////////////////////////////////////////////////////////////////////////////////

  static readonly all: Type[] = observable([])

  static active = observable({value: new Type()})

  static create(partial?: Partial<Type>) {
    const type = makeAutoObservable(new Type())
    Object.assign(type, partial)
    type.id = type.id || uuid4()
    this.all.push(type)
    reaction(() => type.name, () => {
      type.name = type.name.trim()
      if (type.name === "") type.name = "NewType"
      if (Type.all.filter((x) => x !== type).map((x) => x.name).includes(type.name)) type.name += "_"
    }, {fireImmediately: true})
    return type
  }

  static createMany(partials: Partial<Type>[]) {
    let created
    runInAction(() => created = partials.map(x => this.create(x)))
    return created
  }

  static destroy(...types: Type[]) {
    uRemove(this.all, ...types)
  }

}
