import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PettyCashService {
  private onDataChanged$ = new BehaviorSubject<any>({});
  public onDataChangedObservable$ = this.onDataChanged$.asObservable();

  constructor(private http: HttpClient,) { }

  getListItemByemployee(pageNo = 1, size = 10, employeetId): Observable<any> {
    return this.http.get(`http://localhost:3001/api/pettycashs?query=${employeetId}&pageNo=${pageNo}&size=${size}`);
  }


  createListItem(body: any): Observable<any> {
    return this.http.post('http://localhost:3001/api/pettycashs', body)
      .pipe(map((res: any) => {
        this.onDataChanged$.next(res.data);
        return res;
      }));
  }
  updateListItem(id: string, body: any): Observable<any> {
    return this.http.put(`http://localhost:3001/api/pettycashs/${id}`, body)
      .pipe(map((result: any) => {
        this.onDataChanged$.next(result.data);
        return result;
      }));
  }

}
