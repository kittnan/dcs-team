import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpPmPlanService {
  private API = environment.API
  private FILE_UPLOAD = environment.FILE_UPLOAD
  private FILE_DELETE = environment.FILE_DELETE
  private SUB = 'pm-plan'
  constructor(
    private http: HttpClient
  ) { }
  get(params: HttpParams): Observable<any> {
    return this.http.get(`${this.API}/${this.SUB}`, { params: params })
  }
  create(data: any): Observable<any> {
    return this.http.post(`${this.API}/${this.SUB}/create`, data)
  }
  update(data: any): Observable<any> {
    return this.http.post(`${this.API}/${this.SUB}/update`, data)
  }
}
