import { Injectable } from '@angular/core';

import { AppState } from '../store/reducers';
import * as AuthActions from '../store/actions/auth.actions';

export interface LoginRequestData {
  email: string;
  password: string;
}

export interface SignupRequestData extends LoginRequestData {
  username: string;
}

export interface SignupResponseData {
  message: string;
  userId: string;
};

export interface LoginResponseData extends SignupResponseData {
  token: string;
  expiresIn: number;
}

export interface LoginSuccessData {
  token: string;
  userId: string;
}

export interface UserData extends LoginSuccessData {
  expirationDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenExpTimer: any | null;

  constructor(
    private store: AppState
  ) { }

  setLogoutTimer(expirationTime: number) {
    this.tokenExpTimer = setTimeout(
      () => this.store.dispatch(AuthActions.logout()), 
      expirationTime
    )
  } 

  clearExpTimer() {
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }
}
