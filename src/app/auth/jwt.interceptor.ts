import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { LocalStorageService } from '../service/local-storage.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  isRefresh: boolean = false
  constructor(
    private $local: LocalStorageService,
    private http: HttpClient,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let access_token: any = this.$local.getToken()
    if (access_token) {
      if (!request.url.includes('auth/refresh') && !request.url.includes('auth/login')) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + access_token
          }
        })
      }
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          if (!this.isRefresh) {
            this.isRefresh = true
            return this.refreshToken().pipe(
              switchMap((token: any) => {
                this.$local.setRefreshToken(token.refresh_token)
                this.$local.setToken(token.access_token)
                this.isRefresh = false
                request = request.clone({
                  setHeaders: {
                    Authorization: 'Bearer ' + token.access_token
                  }
                })
                return next.handle(request)

              })
            )
          }
        } if (error.status === 403) {
          this.$local.clear()
          this.router.navigate(['']).then(() => location.reload())
        }
        return throwError(error);
      })
    )


  }

  refreshToken(): Observable<any> {
    let refreshToken = this.$local.getRefreshToken()
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + refreshToken
    });
    return this.http.post(`${environment.API}/auth/refresh`, {}, { headers })
  }

}
