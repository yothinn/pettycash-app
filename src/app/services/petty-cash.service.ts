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

  getItemById(pageNo = 1 , size = 10, employeetId:string): Observable<PettyCash> {
    return this.http.get<PettyCash>(`http://localhost:3001/api/pettycashs?query=${employeetId}&pageNo=${pageNo}&size=${size}`)
    .pipe(map((result: any) => {
        result.data = result.data.map(item => Object.assign(new PettyCash(), item) )
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
  // updateListItem(id: string, body: any): Observable<any> {
  //   return this.http.put(`http://localhost:3001/api/pettycashs/${id}`, body)
  //     .pipe(map((result: any) => {
  //       this.onDataChanged$.next(result.data);
  //       return result;
  //     }));
  // }

}
