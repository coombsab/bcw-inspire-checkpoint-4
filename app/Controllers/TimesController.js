import { appState } from "../AppState.js";
import { timesService } from "../Services/TimesService.js";
import { setText } from "../Utils/Writer.js";

function _drawTime() {
  if (!appState.time) {
    return
  }
  if (appState.time.isLocal) {
    setText("time", appState.time.local)
  } else {
    setText("time", appState.time.military)
  }
}
export class TimesController {
  
  constructor() {
    this.getTime()
    _drawTime()
    appState.on("time", _drawTime)
  }

  getTime() {
    timesService.getTime()
  }

  toggleTimeFormat() {
    timesService.toggleTimeFormat()
    appState.emit("time")
  }
}