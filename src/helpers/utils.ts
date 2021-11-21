import l from "lodash"

export const uClone = l.cloneDeep
export const uIntersection = l.intersection
export const uIsEqual = l.isEqual
export const uDebounce = l.debounce
export const uThrottle = l.throttle

// simple 2d box collision check
export function uCollision(pA: Point | Shape, pB: Point | Shape) {
  if (pA === pB) return false
  const a = pA as Shape
  const b = pB as Shape
  const min = 0.001
  return a.x < b.x + (b.width || min) && a.x + (a.width || min) > b.x && a.y < b.y + (b.height || min) && a.y + (a.height || min) > b.y
}

// snap number down to nearest multiple of step
export function uSnap(number: number, step: number) {
  return Math.floor(number / step) * step
}

// return last element of array
export function uLast<T>(array: Array<T>): T {
  return array[array.length - 1]
}

// remove items from array
export function uRemove<T>(array: Array<T>, ...items: Array<T>) {
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

// capitalize string
export function uCapitalize(string: string) {
  return string && string[0].toUpperCase() + string.slice(1)
}

// image element from url, waits for onload
export function uImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve(img)
    img.onerror = () => reject()
  })
}

// sleep for n miliseconds
export async function uSleep(n) {
  return new Promise(resolve => setTimeout(resolve, n))
}

// create data url for given color
export function uColorToUrl(color: string) {
  const canvas = document.createElement("canvas")
  canvas.width = 100
  canvas.height = 100
  const ctx = canvas.getContext("2d")!
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 100, 100)
  return canvas.toDataURL()
}

// random integer, max exclusive
export function uRand(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

// random array item
export function uRandItem<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)]
}

// range
export function uRange(size) {
  return [...Array(size).keys()]
}
