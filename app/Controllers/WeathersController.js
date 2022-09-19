import { appState } from "../AppState.js"
import { weathersService } from "../Services/WeathersService.js"
import { Pop } from "../Utils/Pop.js"
import { setText } from "../Utils/Writer.js"

function _drawWeather() {
  if (!appState.weather) {
    return
  }
  const weather = appState.weather
  setText("weather", weather.weather)
  // setText("weather-icon", weather.icon)

  const weatherIconElem = document.getElementById("weather-icon")
  // @ts-ignore
  weatherIconElem.src = weather.icon
  // @ts-ignore
  weatherIconElem.alt = weather.weather
}

function _drawTemp() {
  if (!appState.weather) {
    return
  }
  const weather = appState.weather
  switch(appState.currentTempFormat) {
    case "celcius":
      setText("temp", weather.Celcius + "° C")
      break
    case "kelvin":
      setText("temp", weather.Kelvin + " K")
      break
    default:
      setText("temp", weather.Fahrenheit + "° F")
      break
  }
}

export class WeathersController {
  constructor() {
    this.getWeather()
    appState.on("weather", _drawWeather)
    appState.on("currentTempFormat", _drawTemp)
  }

  async getWeather() {
    try {
      await weathersService.getWeather()
    }
    catch(error) {
      console.error('[getWeather]', error)
      Pop.error(error)
    }
  }

  toggleWeatherFormat() {
    weathersService.toggleWeatherFormat()
  }
}