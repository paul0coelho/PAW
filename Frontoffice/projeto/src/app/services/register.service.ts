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

  registerDonator(name: string, email: string, phone:number, address: string, password: string) :  Observable<any>{
    return this.http.post<any>(`${API_ENDPOINT}/login/registerDonator`,{name,email,phone,address,password}, httpOptions)
}

registerEntity(name: string, description: string, email: string, phone:number, address: string, password: string) :  Observable<any>{
  return this.http.post<any>(`${API_ENDPOINT}/login/registerEntity`,{name,description,email,phone,address,password}, httpOptions)
}
 
}

