import { appState } from "../AppState.js"

export class Time {
  constructor(data) {
    this.local = data.local
    this.military = data.military
    this.isLocal = data.isLocal || true
  }
}