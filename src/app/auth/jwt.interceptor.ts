import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("🚀 ~ request:", request)
    if (!request.url.includes('login')) {
      let accessStr: any = localStorage.getItem('DCS_access')
      let access: any = JSON.parse(accessStr)
      let jwtToken = request.clone({
        setHeaders: {
          Authorization: 'bearer ' + access.access_token
        }
      })
      return next.handle(jwtToken)
    }
    return next.handle(request)

  }

  handle401Error() {

  }

}
