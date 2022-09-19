import { appState } from "../AppState.js"

export class Weather {
  constructor(data) {
    this.temp = data.main.temp
    this.weather = data.weather[0].main
    this.icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  }

  get Kelvin () {
    return Math.round(this.temp)
  }

  get Celcius () {
    return Math.round(this.temp - 273.15)
  }

  get Fahrenheit () {
    return Math.round(this.Celcius * (9/5) + 32)
  }
}