import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  newTodo: string = '';
  todos: { text: string; completed: boolean; addedTime: string }[] = [];
  editIndex: number | null = null;
  isInputError: boolean = false;

  constructor(private router: Router) {
    this.loadTodos();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.isInputError = false;
      const currentTime = new Date().toISOString(); // Get current timestamp
      if (this.editIndex !== null) {
        // Update existing todo
        this.todos[this.editIndex] = { ...this.todos[this.editIndex], text: this.newTodo, addedTime: currentTime };
        this.editIndex = null;
      } else {
        // Add new todo with timestamp
        this.todos.push({ text: this.newTodo, completed: false, addedTime: currentTime });
      }
      this.newTodo = '';
      this.saveTodos();
    } else {
      this.isInputError = true;
    }
  }

  cancelEdit() {
    this.editIndex = null;
    this.newTodo = '';
    this.isInputError = false;
  }

  editTodo(index: number) {
    this.editIndex = index;
    this.newTodo = this.todos[index].text;
    this.isInputError = false;
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.saveTodos();
  }

  viewDetails(index: number) {
    this.router.navigate(['/todo-detail', index]); // Navigate to TodoDetail component
  }

  onKeypress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTodo();
    }
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    this.todos = storedTodos ? JSON.parse(storedTodos) : [];
  }
}
