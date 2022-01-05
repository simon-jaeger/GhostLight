import {makeAutoObservable, observable, reaction, runInAction} from "mobx"
import {uRemove} from "/src/helpers/utils"
import uuid4 from "uuid4"

export type ResizeOption = "Disable" | "Scale" | "Repeat" | "Slice"
export type CustomPropType = "string" | "number" | "boolean" | "link"
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
  resize: ResizeOption = "Disable"
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
  static readonly notype = new Type()
  static active = observable({value: Type.notype})

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

  static findById(id: string) {
    return this.all.find((x) => x.id === id)
  }

  static reorder(toMove: Type, target: Type) {
    const indexTarget = this.all.indexOf(target)
    const indexToMove = this.all.indexOf(toMove)
    this.destroy(toMove)
    this.all.splice(indexTarget + (indexToMove < indexTarget ? 0 : 0), 0, toMove)
  }

}
