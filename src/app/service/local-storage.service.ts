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
  setToken(value: string) {
    localStorage.setItem('DCS_access_token', value)
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('DCS_refresh_token')
  }
  setRefreshToken(value: string) {
    localStorage.setItem('DCS_refresh_token', value)
  }

  getProfile(): string | null {
    let profile :any= localStorage.getItem('DCS_profile')
    return JSON.parse(profile)
  }
  setProfile(value: string) {
    localStorage.setItem('DCS_profile', value)
  }

  getAuth(): string | null {
    return localStorage.getItem('DCS_auth')
  }
  setAuth(value: string) {
    localStorage.setItem('DCS_auth', value)
  }

  clear() {
    localStorage.clear()
  }

}
