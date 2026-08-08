import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpSignatureService {
  Url: any = environment.API

  constructor(
    private http: HttpClient
  ) { }

  getExp(params: HttpParams): Observable<any> {
    return this.http.get(this.Url + "/signature/getExp", {
      params: params
    })
  }

  updateSign(data: any): Observable<any> {
    return this.http.put(this.Url + "/signature/updateSign", data)
  }

  updateExp(data: any): Observable<any> {
    return this.http.post(this.Url + "/signature/updateExp", data)
  }

}
