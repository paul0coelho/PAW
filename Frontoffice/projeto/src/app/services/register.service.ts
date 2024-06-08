import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entity } from '../models/entity';

const API_ENDPOINT = 'http://localhost:3000';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerDonator(name: string, email: string, phone: number, address: string, password: string, canvasserCode: string): Observable<any> {
    const requestBody = { name, email, phone, address, password, canvasserCode };
    return this.http.post<any>(`${API_ENDPOINT}/login/registerDonator`, requestBody, httpOptions);
  }


  registerEntity(entity: Entity, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    Object.keys(entity).forEach((key) => {
      formData.append(key, (entity as any)[key]);
    });

    return this.http.post<any>(`${API_ENDPOINT}/login/registerEntity`, formData);
  }

}

