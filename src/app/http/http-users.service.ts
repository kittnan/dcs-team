import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const AUTH_API = environment.API
@Injectable({
  providedIn: 'root'
})
export class HttpUsersService {
  Url: any = environment.API
  constructor(
    private http: HttpClient
  ) { }

  get() {
    return this.http.get(`${AUTH_API}/users`)
  }

  //#region Master User
  Master_User_getall(): Observable<any> {
    return this.http.get(this.Url + "/user/")
  }

  Master_User_add(data: any): Observable<any> {
    return this.http.post(this.Url + "/user/", data)
  }

  Master_User_update(id: any, data: any): Observable<any> {
    return this.http.put(this.Url + "/user/insert/" + id, data)
  }

  Master_User_GetByCondition(data: any): Observable<any> {
    return this.http.post(this.Url + "/user/getByCondition/", data)
  }

  Master_User_DelByCondition(data: any): Observable<any> {
    return this.http.post(this.Url + "/user/delByCondition/", data)
  }
  //#endregion

}
