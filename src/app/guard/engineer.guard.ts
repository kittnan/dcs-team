import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EngineerGuard implements CanActivate {
  constructor(
    private $local: LocalStorageService
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.$local.getAuth() === 'fullAdmin' || this.$local.getAuth() === 'admin' || this.$local.getAuth() === 'engineer' || this.$local.getAuth() === 'special') {
      return true;
    } else {
      return false
    }
  }
}
