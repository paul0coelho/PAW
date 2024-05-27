import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Donator } from '../models/donator';

const endpointDonators = 'http://localhost:3000/donators/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DonatorService {

  constructor(private http: HttpClient) { }

  getDonators(): Observable<Donator[]> {
    return this.http.get<Donator[]>(endpointDonators + "l", httpOptions);
  }

  getDonator(id: string): Observable<Donator> {
    return this.http.get<Donator>(`${endpointDonators}show2/${id}`, httpOptions);
  }

  createDonator(donator: Donator): Observable<Donator> {
    return this.http.post<Donator>(`${endpointDonators}save2`, donator, httpOptions);
  }

  updateDonator(id: string, donator: Donator): Observable<Donator> {
    return this.http.post<Donator>(`${endpointDonators}update2/${id}`, donator, httpOptions);
  }

  deleteDonator(id: string): Observable<any> {
    return this.http.post<any>(`${endpointDonators}delete2/${id}`, httpOptions);
  }
}
