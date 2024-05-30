
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_ENDPOINT = 'http://localhost:3000/login';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password:string): Observable<any>{
    return this.http.post<any>(`${API_ENDPOINT}/loginDonator`, { email, password }, httpOptions);
  }


  logout() {
    localStorage.removeItem('currentUser');
  }
}

