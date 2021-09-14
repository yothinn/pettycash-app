import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient,
    
    ) { }

  createEmployee(body: any): Observable<any>{
    return this.http.post('http://localhost:3000/api/employees',body);
  }
  getEmployee(): Observable<any>{
    return this.http.get('http://localhost:3000/api/employees')
  }
  getEmployees(pageNo = 1, size = 5): Observable<any>{
    return this.http.get(`http://localhost:3000/api/employees?pageNo=${pageNo}&size=${size}`)
  }
  updateEmployee(id,body: any): Observable<any>{
    return this.http.put(`http://localhost:3000/api/employees/${id}`, body)
  }
  searchEmployee(firstName): Observable<any>{
    return this.http.get(`http://localhost:3000/api/employees?query=${firstName}`)
  }
}
