import { Time } from "./Models/Time.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Todo').Todo[]} */
  todoList = []
  /** @type {import('./Models/Todo').Todo | null} */
  todo = null
  /** @type {import('./Models/Image').Image | null} */
  image = null
  /** @type {import('./Models/Quote').Quote | null} */
  quote = null
  /** @type {import('./Models/Weather').Weather | null} */
  weather = null
  /** @type {import('./Models/Time').Time | null} */
  time = loadState("time", Time)

  // TODO Get load/save for temp format to work properly
  tempFormats = ["celcius", "kelvin", "fahrenheit"]
  currentTempFormatIndex = 2
  currentTempFormat

  isTodoListToggled = false

  todoRemaining = 0

}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
