import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialGuard implements CanActivate {
  constructor(
    private $local: LocalStorageService
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.$local.getAuth() === 'admin'||this.$local.getAuth() === 'special') {
      return true;
    }else{
      return false
    }
  }

}
