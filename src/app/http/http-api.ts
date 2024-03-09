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














}
