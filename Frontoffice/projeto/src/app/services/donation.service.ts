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

  registDonation(donation: Donation, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const donationAny: any = donation;

    Object.keys(donationAny).forEach((key) => {
      if (donationAny[key] !== undefined) {
        formData.append(key, donationAny[key]);
      }
    });

    return this.http.post<any>(endpointDonations + "save2", formData);
  }

  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpointDonations + "l", httpOptions);
  }

  getDonationsByDonatorId2(id: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${endpointDonations}returnDonationsByDonatorId/${id}`, httpOptions);
  }

  getDonationsByEntityId2(id: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${endpointDonations}returnDonationsByEntityId/${id}`, httpOptions);
  }

  getDonation(id: string): Observable<Donation> {
    return this.http.get<Donation>(`${endpointDonations}show2/${id}`, httpOptions);
  }

  getDonationsByDonatorId(): Observable<Donation[]> {
    const token = localStorage.getItem('accessToken');
    const authHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Donation[]>(`${endpointDonations}returnDonationsByDonatorId`, { headers: authHeaders });
  }

  getDonationsByEntityId(): Observable<Donation[]> {
    const token = localStorage.getItem('accessToken');
    const authHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Donation[]>(`${endpointDonations}returnDonationsByEntityId`, { headers: authHeaders });
  }
}
