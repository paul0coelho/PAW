import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Points } from '../models/points';

const endpointPoints = 'http://localhost:3000/api/v1/points/';
const endpointDonations = 'http://localhost:3000/api/v1/donations/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(private http: HttpClient) { }

  getPoints(): Observable<Points> {
    return this.http.get<Points>(endpointPoints + "l", httpOptions);
  }

  exchangePointsForVoucher(): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const authHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${endpointDonations}exchangePoints`, httpOptions);
  }
}
