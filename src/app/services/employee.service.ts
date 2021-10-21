import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PettyCash } from '../modules/petty-cash/pettyCash';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // private onDataChanged$ = new BehaviorSubject<any>({});
  // public onDataChangedObservable$ = this.onDataChanged$.asObservable();

  constructor(
    private http: HttpClient,
    
    ) { }

  createEmployee(body: any): Observable<any>{
    return this.http.post('http://localhost:3000/api/employees',body);
  }
  deleteList(body): Observable<any> {
    console.log(body);
    return this.http.delete(`http://localhost:3000/api/employees/${body._id}`, body);
  }
  getEmployee(): Observable<any>{
    return this.http.get<any>('http://localhost:3000/api/employees');
  }
  getEmployees(pageNo = 1, size = 5): Observable<any>{
    return this.http.get(`http://localhost:3000/api/employees?pageNo=${pageNo}&size=${size}`);
  }
  updateEmployee(id: string,body: any): Observable<any>{
    return this.http.put(`http://localhost:3000/api/employees/${id}`, body);
  }
  searchEmployee(firstName): Observable<any>{
    return this.http.get(`http://localhost:3000/api/employees?query=${firstName}`);
  }
  uploadfile(file): Observable<any>{
    console.log(file);
    return this.http.post('http://localhost:3000/api/employees/uploads', file);
  }
}
