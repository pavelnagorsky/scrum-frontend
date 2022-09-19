import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';

import { AppState } from 'src/app/store/reducers';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private store: AppState
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(state => state.auth.token)
      .pipe(
        take(1),
        exhaustMap(token => {
          if (!token) return next.handle(req);
          req = req.clone({
            headers: new HttpHeaders().set(
              "Authorization", `Bearer ${token}`
            )
          });
          return next.handle(req);
        })
      )
  }
}
