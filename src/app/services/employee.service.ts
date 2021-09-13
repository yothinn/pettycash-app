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
}
