import { appState } from "../AppState.js"
import { imagesService } from "../Services/ImagesService.js"
import { Pop } from "../Utils/Pop.js"
import { setText } from "../Utils/Writer.js"

function _drawImage() {
  if (!appState.image) {
    return
  }
  // @ts-ignore
  document.querySelector("body").style.backgroundImage = `url(${appState.image.largeImgUrl})`
  setText("copyright", appState.image.author)
}
export class ImagesController {
  constructor() {
    this.getImage()
    _drawImage()
    appState.on("image", _drawImage)
  }

  async getImage() {
    try {
      await imagesService.getImage()
    }
    catch(error) {
      console.error('[getImage]', error)
      Pop.error(error)
    }
  }
}