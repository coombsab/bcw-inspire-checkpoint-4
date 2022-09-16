import { appState } from "../AppState.js"

export class Weather {
  constructor(data) {
    this.tempK = data.main.temp
    this.tempC = (this.tempK - 273.15).toFixed(2)
    this.tempF = (parseInt(this.tempC) * (9/5) + 32).toFixed(2)
    this.weather = data.weather[0].main
    this.icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    this.tempsByFormat = [
      {
        name: "kelvin",
        temp: this.tempK
      },
      {
        name: "celcius",
        temp: this.tempC
      },
      {
        name: "fahrenheit",
        temp: this.tempF
      }
    ]
  }
}