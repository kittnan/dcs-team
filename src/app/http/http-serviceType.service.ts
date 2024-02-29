import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const AUTH_API = environment.API
@Injectable({
  providedIn: 'root'
})
export class HttpUsersService {

  Url: any = environment.API

  constructor(
    private http: HttpClient
  ) { }


//#region Master User
getAll(): Observable<any> {
  return this.http.get(this.Url + "/serviceTypeOption/")
}

Add(data: any): Observable<any> {
  return this.http.post(this.Url + "/serviceTypeOption/", data)
}

Update(id: any, data: any): Observable<any> {
  return this.http.put(this.Url + "/serviceTypeOption/insert/" + id, data)
}

GetByCondition(data: any): Observable<any> {
  return this.http.post(this.Url + "/serviceTypeOption/getByCondition/", data)
}

DelByCondition(data: any): Observable<any> {
  return this.http.post(this.Url + "/serviceTypeOption/delByCondition/", data)
}
//#endregion



}
