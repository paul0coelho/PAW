import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entity } from '../models/entity';

const endpointEntities = 'http://localhost:3000/api/v1/entities/';
const images = 'http://localhost:3000/images/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private selectedEntity: Entity;

  constructor(private http: HttpClient) { 
    this.selectedEntity = new Entity("","","",0,"","","",undefined,"",);
  }

  getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(endpointEntities + "returnEntities", httpOptions);
  }

  getEntity(id: string): Observable<Entity> {
    return this.http.get<Entity>(`${endpointEntities}show2/${id}`, httpOptions);
  }

 

  updateEntity(entity: Entity): Observable<Entity> {
    const token = localStorage.getItem('accessToken');
    const authHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Entity>(`${endpointEntities}update2`, entity, { headers: authHeaders });
  }


  deleteEntity(id: string): Observable<any> {
    return this.http.post<any>(`${endpointEntities}delete2/${id}`, httpOptions);
  }

  setSelectedEntity(entity: Entity): void {
    this.selectedEntity = entity;
  }

  getSelectedEntity(): Entity {
    return this.selectedEntity;
  }

  getEntityImage(id: String|undefined): Observable<Blob> {
    return this.http.get(images + 'entities/' + id + '.jpg', { responseType: 'blob' });
  }

  getEntityProfile(): Observable<Entity> {
    const token = localStorage.getItem('accessToken');
    const authHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  
    });
    return this.http.get<Entity>('http://localhost:3000/login/profileEntity', { headers: authHeaders });
  }

}
