// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse,
//   HTTP_INTERCEPTORS
// } from '@angular/common/http';
// import { Observable, catchError, switchMap, throwError } from 'rxjs';
// import { LocalStorageService } from '../service/local-storage.service';
// import { AuthService } from './auth.service';
// import { EventBusServiceService } from '../service/event-bus-service.service';
// import { EventData } from '../service/event.class';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   private isRefreshing: boolean = false;

//   constructor(
//     private localStorage: LocalStorageService,
//     private authService: AuthService,
//     private busService: EventBusServiceService
//   ) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     req = req.clone({
//       withCredentials: true,
//     });

//     return next.handle(req).pipe(
//       catchError((error) => {
//         if (
//           error instanceof HttpErrorResponse &&
//           !req.url.includes('auth/signin') &&
//           error.status === 401
//         ) {
//           return this.handle401Error(req, next);
//         }

//         return throwError(() => error);
//       })
//     );
//   }

//   private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
//     if (!this.isRefreshing) {
//       this.isRefreshing = true;

//       if (this.localStorage.isLoggedIn()) {
//         return this.authService.refreshToken().pipe(
//           switchMap(() => {
//             this.isRefreshing = false;

//             return next.handle(request);
//           }),
//           catchError((error) => {
//             this.isRefreshing = false;

//             if (error.status == '403') {
//               this.busService.emit(new EventData('logout', null));
//               console.log('logout');

//             }

//             return throwError(() => error);
//           })
//         );
//       }
//     }

//     return next.handle(request);
//   }


// }
// export const httpInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
// ];
