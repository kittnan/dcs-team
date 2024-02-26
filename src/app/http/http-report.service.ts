import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpReportService {

  private API = environment.API
  private SUB = 'report'
  constructor(
    private http: HttpClient
  ) { }

  get(params: HttpParams): Observable<any> {
    return this.http.get(`${this.API}/${this.SUB}`, { params: params })
  }
  createNewReport(data: any): Observable<any> {
    return this.http.post(`${this.API}/${this.SUB}/createNewReport`, data)
  }
  save(data: any): Observable<any> {
    return this.http.post(`${this.API}/${this.SUB}/save`, data)
  }
  upload(data: FormData): Observable<any> {
    return this.http.post(`${this.API}/${this.SUB}/upload`, data)
  }

}
