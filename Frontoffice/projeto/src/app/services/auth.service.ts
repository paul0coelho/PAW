
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

  login(email: string, password:string): Observable<AuthRestModelResponse>{
    return this.http.post<AuthRestModelResponse>(`${API_ENDPOINT}/loginSubmitted`, new LoginModel( email, password));
  }


  logout() {
    localStorage.removeItem('currentUser');
  }

  register(username: string, password: string) :  Observable<AuthRestModelResponse>{
      return this.http.post<any>(`${API_ENDPOINT}/`, new LoginModel( username, password))
  }
}
export interface AuthRestModelResponse{

}

export class LoginModel{

  constructor(public email:string, public password:string){}

}
