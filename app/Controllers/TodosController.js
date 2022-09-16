import { appState } from "../AppState.js"
import { todosService } from "../Services/TodosService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function _drawTodoList() {
  let template = ""
  appState.todoList.forEach(todo => template += todo.ListTemplate)
  setHTML("todo-list", template)
}
export class TodosController {
  constructor() {
    this.getTodoList()
    _drawTodoList()
    appState.on("todoList", _drawTodoList)
  }

  async addTodo() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target
      const formData = getFormData(form)
      await todosService.addTodo(formData)
      // @ts-ignore
      form.reset()
    }
    catch(error) {
      console.error('[addTodo]', error)
      Pop.error(error)
    }
  }

  async getTodoList() {
    try {
      await todosService.getTodoList()
    }
    catch(error) {
      console.error('[getTodoList]', error)
      Pop.error(error)
    }
  }

  async deleteTodo(id) {
    try {
      await todosService.deleteTodo(id)
    }
    catch(error) {
      console.error('[deleteTodo]', error)
      Pop.error(error)
    }
  }

  async toggleTodo(id) {
    try {
      await todosService.toggleTodo(id)
    }
    catch(error) {
      console.error('[toggleTodo]', error)
      Pop.error(error)
    }
  }
}