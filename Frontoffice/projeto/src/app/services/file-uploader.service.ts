import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const endpoint = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<any>(endpoint + 'file_upload', formData);
  }

  uploadFileWithData(file: File, title:string): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    return this.http.post<any>(endpoint + 'file_and_data_upload', formData);
  }

}