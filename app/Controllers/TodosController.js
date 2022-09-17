import { appState } from "../AppState.js"
import { todosService } from "../Services/TodosService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML, setText } from "../Utils/Writer.js"

function _drawTodoList() {
  let template = ""
  appState.todoList.forEach(todo => template += todo.ListTemplate)
  setHTML("todo-list", template)
}

function _drawTodoCount() {
  todosService.updateTodoCount()
  if (appState.todoRemaining !== 0) {
    setText("todo-count", appState.todoRemaining + " left")
  } else {
    setText("todo-count", "All complete!")
    Pop.toast("All tasks are complete!", "success", "top")
  }
}

export class TodosController {
  constructor() {
    this.getTodoList()
    appState.on("todoList", _drawTodoList)
    appState.on("todoList", _drawTodoCount)
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
      const todo = appState.todoList.find(t => t.id === id)
      if (!todo) {
        return
      }
      const yes = await Pop.confirm(`Do you want to delete ${todo.description.toUpperCase()}`)
      if (!yes) {
        return
      }
      await todosService.deleteTodo(id)
      Pop.toast(`Deleted ${todo.description.toUpperCase()}`, "warning", "top")
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

  toggleTodoList() {
    todosService.toggleTodoList()
  }
}