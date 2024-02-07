import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const AUTH_API = environment.API
@Injectable({
  providedIn: 'root'
})
export class HttpUsersService {

  constructor(
    private http: HttpClient
  ) { }

  get(){
    return this.http.get(`${AUTH_API}/users`)
  }
}
