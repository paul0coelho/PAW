import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entity } from '../models/entity';

const endpointEntities = 'http://localhost:3000/entities/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  constructor(private http: HttpClient) { }

  getEntity(id:String): Observable<Entity> {
    return this.http.get<Entity>(endpointEntities + "show2/" + id)
  }
}
