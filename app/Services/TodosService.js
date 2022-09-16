import { appState } from "../AppState.js"
import { Todo } from "../Models/Todo.js"
import { sandboxServer } from "./AxiosService.js"

class TodosService {
  
  constructor() {
    
  }
  async getTodoList() {
    const response = await sandboxServer.get("abraham/todos")
    appState.todoList = response.data.map(data => new Todo(data))
  }

  async addTodo(formData) {
    const response = await sandboxServer.post("abraham/todos", formData)
    // console.log(response.data)
    appState.todoList = [...appState.todoList, new Todo(response.data)]
    // console.log(appState.todoList)
  }

  async deleteTodo(id) {
    await sandboxServer.delete("abraham/todos/" + id)
    appState.todoList = appState.todoList.filter(todo => todo.id !== id)
  }
  async toggleTodo(id) {
    const updatedTodo = appState.todoList.find(todo => todo.id = id)
    if (!updatedTodo) {
      throw new Error ("Invalid ID")
    }
    updatedTodo.completed = !updatedTodo.completed
    const response = await sandboxServer.put("abraham/todos/" + id, updatedTodo)
    appState.emit("todoList")
  }
}

export const todosService = new TodosService()