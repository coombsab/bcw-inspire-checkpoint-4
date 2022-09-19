import { appState } from "../AppState.js"
import { Weather } from "../Models/Weather.js"
import { saveState } from "../Utils/Store.js"
import { sandboxServer } from "./AxiosService.js"

class WeathersService {
  constructor() {
    
  }
  toggleWeatherFormat() {
    if (!appState.weather) {
      return
    }

    // @ts-ignore
    if (appState.currentTempFormatIndex < appState.tempFormats.length - 1) {
      // @ts-ignore
      appState.currentTempFormatIndex++
    } else {
      appState.currentTempFormatIndex = 0
    }
    // @ts-ignore
    appState.currentTempFormat = appState.tempFormats[appState.currentTempFormatIndex]
    saveState("tempFormat", appState.currentTempFormat)
    saveState("tempIndex", appState.currentTempFormatIndex)
  }
  async getWeather() {
    const response = await sandboxServer.get("weather")
    appState.weather = new Weather(response.data)
    
    if (!appState.currentTempFormat) {
      // @ts-ignore
      appState.currentTempFormat = appState.tempFormats[appState.currentTempFormatIndex]
      saveState("tempFormat", appState.currentTempFormat)
      saveState("tempIndex", appState.currentTempFormatIndex)
    } else {
      appState.emit("currentTempFormat")
    }
  }
}

export const weathersService = new WeathersService()