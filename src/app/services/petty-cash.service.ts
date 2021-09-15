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

  getListItemByemployee(pageNo=1, size = 25, contactId:string): Observable<any> {
    let apiUrl = `http://localhost:3001/api/pettycashs?customerId=${contactId}&pageNo=${pageNo}&size=${size}`;
    return this.http.get(apiUrl);
  }

  createListItem(body: any): Observable<any> {
    return this.http.post('http://localhost:3001/api/pettycashs', body)
              .pipe(map((res: any) => {
                this.onDataChanged$.next(res.data);
                return res;
              }));
  }

}
