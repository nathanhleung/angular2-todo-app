import {Component, View} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http'; // We're using http in our TodoService
import {TodoService} from './TodoService'

class TodoComponent {
  constructor(todoService) {
    // So it isn't undefined
    this.todos = [];
    this.todoData = {
      text: ''
    };
    this.todoService = todoService;
    this.todoService.getAllTodos()
      .subscribe((res) => {
        this.todos = res;
      });
  }
  createTodo() {
    this.todoService.postNewTodo(this.todoData)
      .subscribe((res) => {
        this.todos = res;
        this.todoData.text = '';
      });
  }
  deleteTodo(id) {
    this.todoService.deleteTodo(id)
      .subscribe((res) => {
        this.todos = res;
      })
  }
};

TodoComponent.annotations = [
  new Component({
    selector: 'todo-app',
    providers: [TodoService, HTTP_PROVIDERS],
    templateUrl: 'templates/TodoComponent'
  }),
];

TodoComponent.parameters = [[TodoService]];

export {TodoComponent};
