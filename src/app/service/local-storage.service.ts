import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  isLoggedIn() {
    if (localStorage.getItem('DCS_access'))
      return true
    return false
  }
  getToken(): string | null {
    return localStorage.getItem('DCS_access_token')
  }
  getRefreshToken(): string | null {
    return localStorage.getItem('DCS_refresh_token')
  }
  setToken(value:string) {
    localStorage.setItem('DCS_access_token',value)
  }
  setRefreshToken(value:string) {
    localStorage.setItem('DCS_refresh_token',value)
  }
  clear(){
    localStorage.clear()
  }

}
