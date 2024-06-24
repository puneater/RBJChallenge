import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee.model';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  employeeForm = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    hiredDate: new FormControl<Date | null>(null)
  });

  employees$ = this.getEmployees();

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
}
