import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PettyCash } from '../modules/petty-cash/pettyCash';

@Injectable({
  providedIn: 'root'
})
export class PettyCashService {
  private onDataChanged$ = new BehaviorSubject<any>({});
  public onDataChangedObservable$ = this.onDataChanged$.asObservable();

  constructor(private http: HttpClient,) { }

  getItemById(employeeId: string, pageNo, size ): Observable<PettyCash> {
    return this.http.get<PettyCash>(`http://localhost:3001/api/pettycashs?employeeId=${employeeId}&pageNo=${pageNo}&size=${size}`)
      .pipe(map((result: any) => {
        console.log(result);
        result.data = result.data.map(item => Object.assign(new PettyCash(), item))
        return result;
      })
      );
  }


  createListItem(body: any): Observable<any> {
    return this.http.post('http://localhost:3001/api/pettycashs', body)
      .pipe(map((res: any) => {
        this.onDataChanged$.next(res.data);
        return res;
      }));
  }

  getTest(): Observable<PettyCash> {
    return this.http.get<PettyCash>('http://localhost:3001/api/pettycashs/total')
  }
  // updateListItem(id: string, body: any): Observable<any> {
  //   return this.http.put(`http://localhost:3001/api/pettycashs/${id}`, body)
  //     .pipe(map((result: any) => {
  //       this.onDataChanged$.next(result.data);
  //       return result;
  //     }));
  // }

  // uploadfile(file): Observable<any>{
  //   return this.http.post('http://localhost:3001/api/pettycashs/uploads', file)
  //   .pipe(map((res: any) => {
  //     this.onDataChanged$.next(res.data);
  //     return res;
  //   }));
  // }
}
