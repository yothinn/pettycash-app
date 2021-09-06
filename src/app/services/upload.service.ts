import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  uploadFile(subFolder, file:any): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/uploads/${subFolder}`, file);
  }

  deleteFile(subFolder, filename: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/api/uploads/${subFolder}/${filename}`);
  }

}
