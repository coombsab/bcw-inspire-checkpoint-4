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

    console.log("toggling from", appState.currentTempFormat)
    console.log("old index", appState.currentTempFormatIndex)

    // @ts-ignore
    if (appState.currentTempFormatIndex < appState.tempFormats.length - 1) {
      // @ts-ignore
      appState.currentTempFormatIndex++
      console.log("new index", appState.currentTempFormatIndex)
    } else {
      appState.currentTempFormatIndex = 0
      console.log("new index", appState.currentTempFormatIndex)
    }
    // @ts-ignore
    appState.currentTempFormat = appState.tempFormats[appState.currentTempFormatIndex]
    console.log("toggling to", appState.currentTempFormat)
    saveState("tempFormat", appState.currentTempFormat)
    saveState("tempIndex", appState.currentTempFormatIndex)
  }
  async getWeather() {
    const response = await sandboxServer.get("weather")
    // console.log(response.data)
    appState.weather = new Weather(response.data)
    // console.log(appState.weather)
    
    if (!appState.currentTempFormat) {
      // console.log("Is my getWeather if happening?")
      // @ts-ignore
      appState.currentTempFormat = appState.tempFormats[appState.currentTempFormatIndex]
      saveState("tempFormat", appState.currentTempFormat)
      saveState("tempIndex", appState.currentTempFormatIndex)
    } else {
      // console.log("getWeather format", appState.currentTempFormat)
      appState.emit("currentTempFormat")
    }
  }
}

export const weathersService = new WeathersService()