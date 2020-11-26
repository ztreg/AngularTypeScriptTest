import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  title:string;

  constructor(private todoService: TodoService) { 
    console.log('TODO COMP');
  }

  ngOnInit(): void {
    this.title = 'Welcome'
  }

  setClasses(){
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }
    return classes;
  }

  //OnToggle
  onToggle(todo: Todo) {

    // toggle in UI
    todo.completed = !todo.completed

    // toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todo => {
      console.log(todo);
    })
    
  }

  //oneDlete {
  onDelete(todo: Todo) {
    this.deleteTodo.emit(todo)
    console.log('VIEW DELETe');
    
  }
}
