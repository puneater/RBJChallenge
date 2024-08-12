import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee.model';
import { UpdateEmployee } from '../model/employee.model';
import { Task } from '../model/task.model';
import { UpdateTaskDTO } from '../model/task.model';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employeeBoard.web';
  http = inject(HttpClient);
  fb = inject(FormBuilder);

  taskForm = new FormGroup({
    taskName: new FormControl<string>(''),
    startDate: new FormControl<Date>(new Date()),
    dueDate: new FormControl<Date | null>(null),
    employee: new FormControl<string>('')
  });

  employeeForm = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    hiredDate: new FormControl<Date | null>(new Date())
  });

  employees$ = this.getEmployees();
  tasks$ = this.getTasks();

  updateEmployeeForm: FormGroup;
  updateTaskForm: FormGroup;

  showUpdateEmployeeModal = false;
  showUpdateTaskModal = false;

  selectedEmployee: Employee | null = null;
  selectedTask: Task | null = null;

  constructor() {
    this.updateEmployeeForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      hiredDate: [null]
    });

    this.updateTaskForm = this.fb.group({
      taskName: [''],
      startDate: [null],
      dueDate: [null],
      employee: ['']
    });
  }

  onTaskSubmit(){
    const addTaskRequest = {
      taskName: this.taskForm.value.taskName,
      startDate: this.taskForm.value.startDate,
      dueDate: this.taskForm.value.dueDate,
      employee: this.taskForm.value.employee
    }

    this.http.post('https://localhost:7029/api/Tasks', addTaskRequest).subscribe({
      next: (value) => {
        this.tasks$ = this.getTasks();
        this.taskForm.reset();
      }
    });
  }

  onTaskDelete(id: string){
    if(window.confirm("Confirm delete")){
      return this.http.delete('https://localhost:7029/api/Tasks/'+id).subscribe({
        next: (values) =>{
          this.tasks$ = this.getTasks();
        }
      });
    }
    else{
      return;
    }
  }

  private getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('https://localhost:7029/api/Tasks');
  }

  onTaskUpdate(task: Task) {
    this.selectedTask = task;
    this.updateTaskForm.patchValue({
      taskName: task.taskName,
      startDate: task.startDate,
      dueDate: task.dueDate,
      employee: task.employee
    });
    this.showUpdateTaskModal = true;
  }

  submitTaskUpdate() {
    if (this.selectedTask) {
      const updateTaskRequest: UpdateTaskDTO = this.updateTaskForm.value;
      this.http.put(`https://localhost:7029/api/Tasks/${this.selectedTask.taskId}`, updateTaskRequest)
        .subscribe({
          next: () => {
            this.tasks$ = this.getTasks();
            this.showUpdateTaskModal = false;
          },
          error: (error) => console.error('Error updating task:', error)
        });
    }
  }

  /* onTaskUpdate(task: Task) {
    const updatetaskRequest: UpdateTaskDTO = {
      taskName: task.taskName,
      startDate: task.startDate,
      dueDate: task.dueDate,
      employee: task.employee
    };

    this.http.put(`https://localhost:7029/api/Tasks/${task.taskId}`, updatetaskRequest)
      .subscribe({
        next: () => {
          this.tasks$ = this.getTasks();
        },
        error: (error) => console.error('Error updating task:', error)
      });
  } */

  onFormSubmit(){
    const addEmployeeRequest = {
      firstName: this.employeeForm.value.firstName,
      lastName: this.employeeForm.value.lastName,
      hiredDate: this.employeeForm.value.hiredDate
    }

    this.http.post('https://localhost:7029/api/Employees', addEmployeeRequest).subscribe({
      next: (value) => {
        this.employees$ = this.getEmployees();
        this.employeeForm.reset();
      }
    });
  }

  onDelete(id: string){
    if(window.confirm("Confirm delete")){
      return this.http.delete('https://localhost:7029/api/Employees/'+id).subscribe({
        next: (values) =>{
          this.employees$ = this.getEmployees();
        }
      });
    }
    else{
      return;
    }
  }

  private getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('https://localhost:7029/api/Employees');
  }

  onUpdate(employee: Employee) {
    this.selectedEmployee = employee;
    this.updateEmployeeForm.patchValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      hiredDate: employee.hiredDate
    });
    this.showUpdateEmployeeModal = true;
  }

  submitEmployeeUpdate() {
    if (this.selectedEmployee) {
      const updateEmployeeRequest: UpdateEmployee = this.updateEmployeeForm.value;
      this.http.put(`https://localhost:7029/api/Employees/${this.selectedEmployee.employeeId}`, updateEmployeeRequest)
        .subscribe({
          next: () => {
            this.employees$ = this.getEmployees();
            this.showUpdateEmployeeModal = false;
          },
          error: (error) => console.error('Error updating employee:', error)
        });
    }
  }

  /* onUpdate(employee: Employee) {
    const updateEmployeeRequest: UpdateEmployee = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      hiredDate: employee.hiredDate
    };

    this.http.put(`https://localhost:7029/api/Employees/${employee.employeeId}`, updateEmployeeRequest)
      .subscribe({
        next: () => {
          this.employees$ = this.getEmployees();
        },
        error: (error) => console.error('Error updating employee:', error)
      });
  } */
}
