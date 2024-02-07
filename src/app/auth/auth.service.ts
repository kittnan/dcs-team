import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Router } from '@angular/router';
const AUTH_API = environment.API
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;

  constructor(
    private http: HttpClient,
    private router:Router
  ) {
    this.userSubject = new BehaviorSubject<User>({});
    this.user = this.userSubject.asObservable();
  }

  refreshToken() {
    return this.http.post(`${AUTH_API}/auth/refresh`, {}, httpOptions)
  }

  login(data: any) {
    return this.http.post(`${AUTH_API}/auth/login`, data,{
      withCredentials:true
    }).pipe(map(user=>{
      this.userSubject.next(user)

    }))
  }
  refresh(data: any) {
    return this.http.post(`${AUTH_API}/auth/refresh`, data)
  }
}
