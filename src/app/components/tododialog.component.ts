import { Response } from '@angular/http';
import { TodoService } from '../services/todo.service';
import { UserService } from '../services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-todo-dialog',
    templateUrl: '../templates/todo-dialog.html'
  })
  export class TodoDialogComponent implements OnInit {

    constructor(
      public dialogRef: MatDialogRef<TodoDialogComponent>,
      private todoService: TodoService,
      private userService: UserService,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
      todosList = new Array();
      userList = new Array();

      ngOnInit(): void {
          this.userService.getUsers()
          .subscribe(users => {
            this.userList = users;
          });
      }
      onNoClick(): void {
        this.dialogRef.close();
      }
      editTodo(todo) {
        this.todoService.editTodo(todo).subscribe(res => {
          console.log('Update Succesful');
        }, err => {
          console.error('Update Unsuccesful');
        });
        this.dialogRef.close();
      }
  }
