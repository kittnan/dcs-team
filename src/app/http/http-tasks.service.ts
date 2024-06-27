import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpTasksService {


  private API = environment.API
  private FILE_UPLOAD = environment.FILE_UPLOAD
  private FILE_DELETE = environment.FILE_DELETE
  private SUB = 'tasks'

  constructor(
    private http: HttpClient
  ) { }
  get(params: HttpParams): Observable<any> {
    return this.http.get(`${this.API}/${this.SUB}`, { params: params })
  }
  genPM(params: HttpParams): Observable<any> {
    return this.http.get(`${this.API}/${this.SUB}/genPM`, { params: params })
  }
  create(data: any): Observable<any> {
    return this.http.post(`${this.API}/${this.SUB}/create`, data)
  }
  update(data: any): Observable<any> {
    return this.http.put(`${this.API}/${this.SUB}/update`, data)
  }
  updateDataMany(data: any): Observable<any> {
    return this.http.put(`${this.API}/${this.SUB}/updateDataMany`, data)
  }
  updateData(data: any): Observable<any> {
    return this.http.put(`${this.API}/${this.SUB}/updateData`, data)
  }
  updateDataGroup(data: any): Observable<any> {
    return this.http.put(`${this.API}/${this.SUB}/updateDataGroup`, data)
  }
  updateLastPM(data: any): Observable<any> {
    return this.http.put(`${this.API}/${this.SUB}/updateLastPM`, data)
  }
}