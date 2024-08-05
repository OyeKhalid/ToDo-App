import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private localStorageKey = 'todos';

  constructor() {}

  getTodos(): any[] {
    const todos = localStorage.getItem(this.localStorageKey);
    return todos ? JSON.parse(todos) : [];
  }

  saveTodos(todos: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
  }

  addTodo(todo: any): void {
    const todos = this.getTodos();
    todos.push(todo);
    this.saveTodos(todos);
  }

  updateTodo(index: number, todo: any): void {
    const todos = this.getTodos();
    todos[index] = todo;
    this.saveTodos(todos);
  }

  deleteTodo(index: number): void {
    const todos = this.getTodos();
    todos.splice(index, 1);
    this.saveTodos(todos);
  }
}
