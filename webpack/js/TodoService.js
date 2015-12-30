import {Inject} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map'

class TodoService {
  constructor(Http) {
    this.Http = Http;
  }
  getAllTodos() {
    return this.Http.get('/todos')
      .map((res) => {
        return JSON.parse(res._body);
      });
  }
  postNewTodo(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.Http.post('/todos', JSON.stringify(data), {
      headers: headers
    }).map((res) => {
        return JSON.parse(res._body);
      });
  }
  deleteTodo(id) {
    return this.Http.delete('/todos/' + id)
      .map((res) => {
        return JSON.parse(res._body);
      });
  }
}

TodoService.parameters = [new Inject(Http)];

export {TodoService}
