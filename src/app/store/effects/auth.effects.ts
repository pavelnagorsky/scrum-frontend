import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, exhaustMap, tap } from "rxjs";

import { 
  LoginRequestData,
  AuthService, 
  SignupResponseData,
  LoginResponseData,
  SignupRequestData,
  UserData
} from "src/app/services/auth.service";
import * as AuthActions from '../actions/auth.actions';
import { clearProjectInfo } from "../actions/project.actions";
import { clearProjectsListInfo, fetchProjectsStart } from "../actions/projects-list.actions";
import { AppState } from "../reducers";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private store: AppState
  ) {}

  // регистрация пользователя
  performSignup = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.signupStart),
      exhaustMap( signupData => this.handleSignup(signupData) )
    )
  )

  // авторизация пользователя и заполнение localStorage
  performLogin = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.loginStart),
      exhaustMap( loginData => this.handleLogin(loginData) )      
    )
  )

  // редирект при успешной авторизации
  performLoginSuccess = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.loginSuccess),
      tap(action => {
        // запуска процесс получения сведений о проектах пользователя
        this.store.dispatch(fetchProjectsStart());
        this.router.navigate(['projects']);
      })
    ), { dispatch: false }
  )

  performAutoLogin = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const user: UserData = JSON.parse(
          localStorage.getItem('user') || "null"
        );
        if (!user || (new Date() >= new Date(user.expirationDate)) ) {
          return AuthActions.logout();
        };
        return AuthActions.loginSuccess({
          userId: user.userId,
          token: user.token
        })
      })
    )
  )

  // логаут пользователя
  performLogout = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.clearExpTimer();
        localStorage.removeItem('user');
        this.router.navigate(['auth'], {
          queryParams: {
            login: true
          }
        });
        // очищаем данные вышедшего пользователя
        this.store.dispatch(clearProjectsListInfo());
        this.store.dispatch(clearProjectInfo());
      })
    ), { dispatch: false }
  )

  private handleSignup(signupData: SignupRequestData) {
    return this.http.put<SignupResponseData>(
      '/auth/signup',
      signupData
    ).pipe(
      // далее автоматическая авторизация
      map(response => {
        const loginData: LoginRequestData = {
          email: signupData.email,
          password: signupData.password
        };
        return AuthActions.loginStart(loginData)
      }),
      catchError((err: HttpErrorResponse) => {
        return this.errorHandler(err)
      })
    )
  }

  private handleLogin(loginData: LoginRequestData) {
    return this.http.post<LoginResponseData>(
      "/auth/login",
      loginData
    ).pipe(
      tap((authResponse => {
        this.authService.setLogoutTimer(
          +authResponse.expiresIn
        )
      })),
      map(authResponse => {
        const expirationDate = new Date(
          new Date().getTime() + 
          +authResponse.expiresIn
        );
        localStorage.setItem("user", JSON.stringify({
          token: authResponse.token,
          userId: authResponse.userId,
          expirationDate: expirationDate
        }));
        return AuthActions.loginSuccess({
          userId: authResponse.userId,
          token: authResponse.token
        })
      }),
      catchError((err: HttpErrorResponse) => {
        return this.errorHandler(err)
      })
    )
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    let errorMessage = "Network error occured. Please, check your internet connection.";
    if (errorResponse.status === 500) {
      errorMessage = "Unknown server error. Please, check your internet connection."
    }
    if (errorResponse.error && errorResponse.error.message) {
      errorMessage = errorResponse.error.message;
    }
    return of(AuthActions.authFail({
      errorMessage: errorMessage
    }));
  }

}