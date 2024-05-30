import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_ENDPOINT = 'http://localhost:3000';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(name: string, email: string, phone:number, address: string, password: string) :  Observable<any>{
    return this.http.post<any>(`${API_ENDPOINT}/login/register`, new RegisterModel( name, email, phone, address, password))
}
 
}
export class RegisterModel{

  constructor(public name:string, public email:string,public phone:number,public address:string, public password:string){}

}
