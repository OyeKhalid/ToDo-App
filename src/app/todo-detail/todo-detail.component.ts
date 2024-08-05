import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


interface Todo {
  text: string;
  completed: boolean;
  addedTime: string;
}

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todo: Todo | null = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Retrieve the index from route parameters
    const index = this.route.snapshot.paramMap.get('index');
    if (index !== null) {
      // Fetch todos from local storage
      const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
      
      // Ensure the index is valid
      if (!isNaN(Number(index)) && todos[Number(index)]) {
        this.todo = todos[Number(index)];
      } else {
        this.todo = null; // Invalid index
      }
    }

  goBack() {
    this.router.navigate(['/']); // Navigate back to the todo list
  }
}
  
}
