import { Response } from '@angular/http';
import { TodoService } from './services/todo.service';
import { UserService } from './services/user.service';
import User from './models/user.model';
import ToDo from './models/todo.model';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private todoService: TodoService,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  public newTodo: ToDo = new ToDo();
  public newUser: User = new User();
  title = 'app';
  todosList = new Array();
  editTodos: ToDo[] = [];
  userList: User[];
  editUsers: User[] = [];
  isShowingTodos;
  isShowingUsers;

  ngOnInit(): void {
    this.todoService.getToDos()
      .subscribe(todos => {
        this.todosList = todos;
        this.isShowingTodos = true;
      });
      console.log(this.todosList);
      this.userService.getUsers()
      .subscribe(users => {
        this.userList = users;
        this.isShowingUsers = false;
      });
  }

  showUsers() {
    this.isShowingUsers = true;
    this.isShowingTodos = false;
    document.getElementById('showUserButton').classList.add('mat-primary');
    document.getElementById('showTodoButton').classList.remove('mat-primary');
  }
  showTodos() {
    this.isShowingUsers = false;
    this.isShowingTodos = true;
    document.getElementById('showUserButton').classList.remove('mat-primary');
    document.getElementById('showTodoButton').classList.add('mat-primary');
  }

  createToDo() {
    this.newTodo.status = 'Incomplete';
    console.log(this.newTodo);
    this.todoService.createTodo(this.newTodo)
      .subscribe((res) => {
        console.log(this.todosList);
        this.todosList.push(res.data);
        this.newTodo = new ToDo();
      });
  }

  editTodo(todo: ToDo) {
    if (this.todosList.includes(todo)) {
      if (!this.editTodos.includes(todo)) {
        this.editTodos.push(todo);
      }else {
        this.editTodos.splice(this.editTodos.indexOf(todo), 1);
        this.todoService.editTodo(todo).subscribe(res => {
          console.log('Update Succesful');
        }, err => {
          this.editTodo(todo);
          console.error('Update Unsuccesful');
        });
      }
    }
  }

  doneTodo(todo: ToDo) {
    todo.status = 'Complete';
    this.todoService.editTodo(todo).subscribe(res => {
      console.log('Update Succesful');
    }, err => {
      this.editTodo(todo);
      console.error('Update Unsuccesful');
    });
  }

  undoTodo(todo: ToDo) {
    todo.status = 'Incomplete';
    this.todoService.editTodo(todo).subscribe(res => {
      console.log('Update Succesful');
    }, err => {
      this.editTodo(todo);
      console.error('Update Unsuccesful');
    });
  }

  submitTodo(event, todo: ToDo) {
    if (event.keyCode === 13) {
      this.editTodo(todo);
    }
  }

  deleteTodo(todo: ToDo) {
    this.todoService.deleteTodo(todo._id).subscribe(res => {
      this.todosList.splice(this.todosList.indexOf(todo), 1);
    });
  }

  isNewUser(user: User) {
    let newUser = false;
    if (this.userList.length < 1) {
      newUser = true;
      return newUser;
    }
    for (let i = 0; i < this.userList.length ; i++) {
      const firstName = this.userList[i].fName;
      const lastName = this.userList[i].lName;
      if ( firstName === this.newUser.fName && lastName === this.newUser.lName) {
        alert('This name exists already. Please choose another.');
        return newUser;
      }
    }
    newUser = true;
    return newUser;
  }

  createUser() {
    if (this.isNewUser(this.newUser)) {
      this.userService.createUser(this.newUser)
          .subscribe((res) => {
            this.userList.push(res.data);
              this.newUser = new User();
          });
        }
  }

  editUser(user: User) {
    console.log(user);
    if (this.userList.includes(user)) {
      if (!this.editUsers.includes(user)) {
        this.editUsers.push(user);
      }else {
        this.editUsers.splice(this.editUsers.indexOf(user), 1);
        this.userService.editUser(user).subscribe(res => {
          console.log('Update Succesful');
        }, err => {
          this.editUser(user);
          console.error('Update Unsuccesful');
        });
      }
    }
  }
  deleteUser(user: User) {
    this.userService.deleteUser(user._id).subscribe(res => {
      this.userList.splice(this.userList.indexOf(user), 1);
    });
  }

  openDialog(todo): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '500px',
      data: {
        todo: todo
      }
    });
  }
}

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './templates/todo-dialog.html'
})
export class TodoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    private todoService: TodoService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
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
