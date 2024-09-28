import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8000/api';
  private apiPoint = '/clients';

  constructor(private http: HttpClient) { }

  store(client: Client): Observable<any> {
    return this.http.post(`${this.apiUrl}/${this.apiPoint}`, client);
  }
}
