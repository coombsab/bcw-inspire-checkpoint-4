import { appState } from "../AppState.js"
import { quotesService } from "../Services/QuotesService.js"
import { Pop } from "../Utils/Pop.js"
import { setText } from "../Utils/Writer.js"

function _drawQuote() {
  if (!appState.quote) {
    return
  }
  setText("author", appState.quote.author)
  setText("quote", '"' + appState.quote.content + '"')
}
export class QuotesController {
  constructor() {
    this.getQuote()
    _drawQuote()
    appState.on("quote", _drawQuote)
  }

  async getQuote() {
    try {
      await quotesService.getQuote()
    }
    catch(error) {
      console.error('[getQuote]', error)
      Pop.error(error)
    }
  }
}