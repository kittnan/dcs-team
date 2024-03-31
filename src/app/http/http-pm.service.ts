import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const AUTH_API = environment.API
@Injectable({
  providedIn: 'root'
})
export class HttpPMService {

  Url: any = environment.API

  constructor(
    private http: HttpClient
  ) { }


//#region Master User
getAll(): Observable<any> {
  return this.http.get(this.Url + "/pm-list/")
}

Add(data: any): Observable<any> {
  return this.http.post(this.Url + "/pm-list/", data)
}

Update(id: any, data: any): Observable<any> {
  return this.http.put(this.Url + "/pm-list/insert/" + id, data)
}

GetByCondition(data: any): Observable<any> {
  return this.http.post(this.Url + "/pm-list/getByCondition/", data)
}

DelByCondition(data: any): Observable<any> {
  return this.http.post(this.Url + "/pm-list/delByCondition/", data)
}
//#endregion



}
