import { appState } from "../AppState.js"
import { saveState } from "../Utils/Store.js"

class TimesService {
  constructor() {
    setInterval(this.getTime, 1000)
  }
  
  toggleTimeFormat() {
    if (appState.time) {
      appState.time.isLocal = !appState.time.isLocal
      saveState("time", appState.time)
    }
  }

  getTime() {
    const date = new Date()
    const currentTime = {
      local: date.toLocaleTimeString(),
      military: date.toTimeString().substring(0, 8),
      isLocal: true,
    }
    if (appState.time) {
      currentTime.isLocal = appState.time.isLocal
    }
    appState.time = currentTime
    saveState("time", appState.time)
  }
}

export const timesService = new TimesService()