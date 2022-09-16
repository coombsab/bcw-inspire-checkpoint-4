export class Todo {
  constructor(data) {
    this.id = data.id
    this.description = data.description
    this.completed = data.completed || false
  }

  get ListTemplate() {
    return /*html*/`
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex gap-2">
          <input type="checkbox" onchange="app.todosController.toggleTodo('${this.id}')" ${this.completed ? "checked" : ""}>
          <p>${this.description}</p>
        </div>
        <i class="mdi mdi-delete selectable" onclick="app.todosController.deleteTodo('${this.id}')"></i>
      </div>
    `
  }
}