import { ImagesController } from "./Controllers/ImagesController.js";
import { QuotesController } from "./Controllers/QuotesController.js";
import { TimesController } from "./Controllers/TimesController.js";
import { TodosController } from "./Controllers/TodosController.js";
import { WeathersController } from "./Controllers/WeathersController.js";

class App {
  todosController = new TodosController()

  imagesController = new ImagesController()

  weathersController = new WeathersController()

  quotesControler = new QuotesController()

  timesController = new TimesController()
}

window["app"] = new App();
