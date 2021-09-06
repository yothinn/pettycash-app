import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerInfoService {

  constructor(
    private httpClient: HttpClient 
  ) { }

  getCustomerInfo(id) {
    return this.httpClient.get(`${environment.apiUrl}/api/customers/${id}`);
  }

  getContactInfo(id) {
    return this.httpClient.get(`${environment.apiUrl}/api/contacts/${id}`);
  }
}
