import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entity } from '../models/entity';

const endpointEntities = 'http://localhost:3000/api/v1/entities/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private http: HttpClient) { }

  getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(endpointEntities + "returnEntities", httpOptions);
  }

  getEntity(id: string): Observable<Entity> {
    return this.http.get<Entity>(`${endpointEntities}show2/${id}`, httpOptions);
  }

  createEntity(entity: Entity): Observable<Entity> {
    return this.http.post<Entity>(`${endpointEntities}save2`, entity, httpOptions);
  }

  updateEntity(id: string, entity: Entity): Observable<Entity> {
    return this.http.post<Entity>(`${endpointEntities}update2/${id}`, entity, httpOptions);
  }

  deleteEntity(id: string): Observable<any> {
    return this.http.post<any>(`${endpointEntities}delete2/${id}`, httpOptions);
  }
}
