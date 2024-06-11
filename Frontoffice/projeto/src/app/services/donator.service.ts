import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Donator } from '../models/donator';

const endpointDonators = 'http://localhost:3000/api/v1/donators/';
const IMAGES_ENDPOINT = 'http://localhost:3000/images/';

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

  
  getDonator(): Observable<Donator> {
    const token = localStorage.getItem('accessToken');
    const authHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Donator>(`${endpointDonators}show2`, { headers: authHeaders });
  }

  createDonator(donator: Donator): Observable<Donator> {
    return this.http.post<Donator>(`${endpointDonators}save2`, donator, httpOptions);
  }

  updateDonator(donator: Donator, file: File): Observable<Donator> {
    const token = localStorage.getItem('accessToken');
    const authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const formData: FormData = new FormData();
  
   
    if (file) {
      formData.append('profileImage', file);
    }
  
    
    const donatorAny: any = donator;
    Object.keys(donatorAny).forEach((key) => {
      if (donatorAny[key] !== undefined && key !== 'profileImage') {
        formData.append(key, donatorAny[key]);
      }
    });
  
    
    return this.http.post<Donator>(`${endpointDonators}update2`, formData, { headers: authHeaders });
  }

  updateDonator2(donator: Donator): Observable<Donator> {
    const token = localStorage.getItem('accessToken');
    const authHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Donator>(`${endpointDonators}update2`, donator, { headers: authHeaders });
  }

  deleteDonator(id: string): Observable<any> {
    return this.http.post<any>(`${endpointDonators}delete2/${id}`, httpOptions);
  }

  getDonatorProfile(): Observable<Donator> {
    const token = localStorage.getItem('accessToken');
    const authHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Donator>('http://localhost:3000/login/profileDonator', { headers: authHeaders });
  }

  getDonatorImage(id: string): Observable<Blob> {
    return this.http.get(`${IMAGES_ENDPOINT}donators/${id}.jpg`, { responseType: 'blob' });
  }


}
