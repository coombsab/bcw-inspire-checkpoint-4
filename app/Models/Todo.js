export class Todo {
  constructor(data) {
    this.id = data.id
    this.description = data.description
    this.completed = data.completed || false
    // console.log(`todo-item-${this.id}`)
  }

  get ListTemplate() {
    return /*html*/`
      <div class="d-flex justify-content-between align-items-center mb-md-2 mb-1 todo-item p-1 rounded">
        <div class="d-flex gap-2 justify-content-center">
          <input type="checkbox" onchange="app.todosController.toggleTodo('${this.id}')" ${this.completed ? "checked" : ""}>
          <p>${this.description.toUpperCase()}</p>
        </div>
        <i class="mdi mdi-delete selectable on-hover" onclick="app.todosController.deleteTodo('${this.id}')"></i>
      </div>
    `
  }
}