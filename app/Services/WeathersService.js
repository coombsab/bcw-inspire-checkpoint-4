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

    if (appState.currentTempFormatIndex < appState.tempFormats.length - 1) {
      appState.currentTempFormatIndex++
    } else {
      appState.currentTempFormatIndex = 0

    }
    appState.currentTempFormat = appState.tempFormats[appState.currentTempFormatIndex]
    saveState("currentTempFormat", appState.currentTempFormat)
  }
  async getWeather() {
    const response = await sandboxServer.get("weather")
    // console.log(response.data)
    appState.weather = new Weather(response.data)
    // console.log(appState.weather)

    if (!appState.currentTempFormat) {
      appState.currentTempFormat = "fahrenheit"
      saveState("currentTempFormat", appState.currentTempFormat)
    }
  }
}

export const weathersService = new WeathersService()