
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

const endpointDonators = 'http://localhost:3000/api/v1/donators/';
const endpointEntities = 'http://localhost:3000/api/v1/entities/';

const API_ENDPOINT = 'http://localhost:3000/login';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${API_ENDPOINT}/login`, { email, password }, httpOptions)
      .pipe(tap(response => {
        localStorage.setItem('accessToken', response.token);
        localStorage.setItem('userType', response.userType);
        console.log('Logged in as:', response.userType);
      }));

  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userType');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return true;
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  changePassword(currentPassword: string, newPassword: string, userType: string): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const authHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { currentPassword, newPassword };
    const endpoint = userType === 'donator' ? `${endpointDonators}changePasswordDonator` : `${endpointEntities}changePasswordEntity`;

    return this.http.post<any>(endpoint, body, { headers: authHeaders });
  }
}

