import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpMastersService {
  Url: any = environment.API
  // private API = environment.API
  private SUB = 'report'
  constructor(
    private http: HttpClient
  ) { }

   //#region Master Machine
  Master_getall(): Observable<any> {
    return this.http.get(this.Url + "/machine/")
  }

  Master_add(data: any): Observable<any> {
    return this.http.post(this.Url + "/machine/", data)
  }

  Master_update(id: any, data: any): Observable<any> {
    return this.http.put(this.Url + "/machine/insert/" + id, data)
  }

  Master_DelByCondition(data: any): Observable<any> {
    return this.http.post(this.Url + "/machine/delByCondition/", data)
  }
  //#endregion


}
