import { createAction, props } from "@ngrx/store";

import { 
  LoginRequestData, 
  LoginSuccessData, 
  SignupRequestData 
} from "src/app/services/auth.service";
import { AuthActionTypes } from "./action-types";

export const loginStart = createAction(
  AuthActionTypes.LOGIN_START,
  props<LoginRequestData>()
)

export const signupStart = createAction(
  AuthActionTypes.SIGNUP_START,
  props<SignupRequestData>()
)

export const loginSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<LoginSuccessData>()
)

export const authFail = createAction(
  AuthActionTypes.AUTHENTICATE_FAIL,
  props<{errorMessage: string}>()
)

export const logout = createAction(
  AuthActionTypes.LOGOUT,
)

export const autoLogin = createAction(
  AuthActionTypes.AUTO_LOGIN
)