import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Donation } from '../models/donation';

const endpointDonations = 'http://localhost:3000/api/v1/donations/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private http: HttpClient) { }

  registDonation(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(`${endpointDonations}save2`, donation, httpOptions);
  }

  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpointDonations + "l", httpOptions);
  }

  getDonationsByDonatorId(): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpointDonations + "returnDonationsByDonatorId", httpOptions);
  }

  getDonationsByEntityId(): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpointDonations + "returnDonationsByEntityId", httpOptions);
  }

  getDonation(id: string): Observable<Donation> {
    return this.http.get<Donation>(`${endpointDonations}show2/${id}`, httpOptions);
  }
}
