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
}
