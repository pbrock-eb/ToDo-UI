import User from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  api_url = 'http://localhost:3000';
  userUrl = `${this.api_url}/api/users`;

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: User): Observable<any> {
    // returns the observable of http post request
    console.log(`${this.userUrl}`);
    return this.http.post(`${this.userUrl}`, user);
  }

  getUsers(): Observable<User[]> {
    console.log(User.length);
    return this.http.get(this.userUrl)
    .map(res  => {
      // Maps the response object sent from the server
      return res['data'].docs as User[];
    });
  }

  editUser(user: User) {
    const editUrl = `${this.userUrl}`;
    // returns the observable of http put request
    return this.http.put(editUrl, user);
  }

  // Delete the object by the id
  deleteUser(id: string): any {
    const deleteUrl = `${this.userUrl}/${id}`;
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
