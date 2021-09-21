import l from "lodash"

export const uClone = l.cloneDeep

// simple 2d box collision check
export function uCollision(pA: Point | Shape, pB: Point | Shape) {
  if (pA === pB) return false
  const a = Object.assign(({x: 0, y: 0, width: 1, height: 1} as Shape), pA)
  const b = Object.assign(({x: 0, y: 0, width: 1, height: 1} as Shape), pB)
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
}

// snap number down to nearest multiple of step
export function uSnap(number: number, step: number) {
  return Math.floor(number / step) * step
}

// remove items from array
export function uRemove<T>(array:Array<T>, ...items:Array<T>) {
  const filtered = array.filter(x => !items.includes(x))
  array.splice(0, array.length, ...filtered)
}

// like Array.find, but starts from the end
export function uFindLast<T>(array: Array<T>, cb: (element: T, index: number, array: T[]) => unknown): T | undefined {
  for (let i = array.length - 1; i >= 0; i--)
    if (cb(array[i], i, array)) return array[i]
}

// toggle value in array
export function uToggle<T>(array: Array<T>, item: T) {
  const index = array.indexOf(item)
  if (index === -1) array.push(item)
  else array.splice(index, 1)
}
