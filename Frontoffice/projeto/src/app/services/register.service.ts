import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entity } from '../models/entity';
import { Donator } from '../models/donator';

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

  registerDonator(donator: Donator, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const donatorAny: any = donator;

    Object.keys(donatorAny).forEach((key) => {
      if (donatorAny[key] !== undefined) {
        formData.append(key, donatorAny[key]);
      }
    });

    console.log(donator);
    console.log(file);

    return this.http.post<any>(`${API_ENDPOINT}/login/registerDonator`, formData);
  }

  registerEntity(entity: Entity, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const entityAny: any = entity;

    Object.keys(entityAny).forEach((key) => {
      if (entityAny[key] !== undefined) {
        formData.append(key, entityAny[key]);
      }
    });

    console.log(entity);
    console.log(file);

    return this.http.post<any>(`${API_ENDPOINT}/login/registerEntity`, formData);
  }
}
