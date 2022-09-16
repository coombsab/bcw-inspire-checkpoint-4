import { appState } from "../AppState.js"
import { Image } from "../Models/Image.js"
import { sandboxServer } from "./AxiosService.js"

class ImagesService {
  constructor() {

  }
  async getImage() {
    const response = await sandboxServer.get("images")
    // console.log(response)
    appState.image = new Image(response.data)
    // console.log(appState.image)
  }
}

export const imagesService = new ImagesService()