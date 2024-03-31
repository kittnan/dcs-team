import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpReportService {

  private API = environment.API
  private FILE_UPLOAD = environment.FILE_UPLOAD
  private FILE_DELETE = environment.FILE_DELETE
  private SUB = 'report'
  constructor(
    private http: HttpClient
  ) { }

  get(params: HttpParams): Observable<any> {
    return this.http.get(`${this.API}/${this.SUB}`, { params: params })
  }
  multi(params: HttpParams): Observable<any> {
    return this.http.get(`${this.API}/${this.SUB}/multi`, { params: params })
  }
  createNewReport(data: any): Observable<any> {
    return this.http.post(`${this.API}/${this.SUB}/createNewReport`, data)
  }
  save(data: any): Observable<any> {
    return this.http.post(`${this.API}/${this.SUB}/save`, data)
  }
  getFile(url:string): Observable<any> {
    return this.http.get(url,{ responseType: 'blob' })
  }
  upload(data: FormData): Observable<any> {
    return this.http.post(`${this.FILE_UPLOAD}`, data)
  }
  delete(data: any): Observable<any> {
    return this.http.post(`${this.FILE_DELETE}`, data)
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(this.API + "/report/insert/" + id, data)
  }
  GetByCondition(data: any): Observable<any> {
    return this.http.post(this.API + "/report/getByCondition/", data)
  }

}
