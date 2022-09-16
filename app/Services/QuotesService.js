import { appState } from "../AppState.js"
import { Quote } from "../Models/Quote.js"
import { sandboxServer } from "./AxiosService.js"

class QuotesService {
  constructor() {
    
  }
  async getQuote() {
    const response = await sandboxServer.get("quotes")
    appState.quote = new Quote(response.data)
  }
}

export const quotesService = new QuotesService()