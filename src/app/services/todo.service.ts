import ToDo from '../models/todo.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable, Pipe, PipeTransform } from '@angular/core';

import 'rxjs/add/operator/map';

@Pipe({
  name: 'todoFilter',
  pure: false
})
export class ToDoFilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    if (!items) { return []; }
    return items.filter(it => it[field] === value);
  }
 }

@Injectable()
export class TodoService {

  api_url = 'http://localhost:3000';
  todoUrl = `${this.api_url}/api/todos`;

  constructor(
    private http: HttpClient
  ) { }

  // Create todo, takes a ToDo Object
  createTodo(todo: ToDo): Observable<any> {
    // returns the observable of http post request
    console.log(`${this.todoUrl}`);
    console.log(todo);
    return this.http.post(`${this.todoUrl}`, todo);
  }

  // Read todo, takes no arguments
  getToDos(): Observable<ToDo[]> {
    return this.http.get(this.todoUrl)
    .map(res  => {
      // Maps the response object sent from the server
      return res['data'];
    });
  }

  // Update todo, takes a ToDo Object as parameter
  editTodo(todo: ToDo) {
    const editUrl = `${this.todoUrl}`;
    // returns the observable of http put request
    return this.http.put(editUrl, todo);
  }

  // Delete the object by the id
  deleteTodo(id: string): any {
    const deleteUrl = `${this.todoUrl}/${id}`;
    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    });
  }

  // Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  logToDo(msg) {
    console.log(msg);
  }
}




