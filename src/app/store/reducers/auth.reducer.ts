import { createReducer, on } from "@ngrx/store";

import * as Actions from '../actions/auth.actions';
import { updateObject } from "src/app/shared/utils/update-object";

export interface AuthState {
  userId: string | null;
  token: string | null;
  authError: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  userId: null,
  token: null,
  authError: null,
  loading: false
}

interface ReduceFunction <T extends (...args: any[]) => any> {
  (
    state: AuthState,
    action: ReturnType<T>
  ) : AuthState
}

export const authReducer = createReducer(
  initialState,
  on(Actions.loginStart, (state, action) => authStartReduce(state, action)),
  on(Actions.signupStart, (state, action) => authStartReduce(state, action)),
  on(Actions.loginSuccess, (state, action) => loginSuccessReduce(state, action)),
  on(Actions.authFail, (state, action) => authFailReduce(state, action)),
  on(Actions.logout, (state, action) => logoutReduce(state, action))
)

const loginSuccessReduce: ReduceFunction<typeof Actions.loginSuccess> = 
(state, action) => {
  return updateObject(state, {
    authError: null,
    loading: false,
    token: action.token,
    userId: action.userId,
  })
}

const authStartReduce: ReduceFunction<typeof Actions.loginStart | typeof Actions.signupStart> = 
(state, action) => {
  return updateObject(state, {
    authError: null,
    loading: true
  })
}

const logoutReduce: ReduceFunction<typeof Actions.logout> =
(state, action) => {
  return updateObject(state, {
    token: null,
    userId: null
  })
}

const authFailReduce: ReduceFunction<typeof Actions.authFail> = 
(state, action) => {
  return updateObject(state, {
    authError: action.errorMessage,
    loading: false
  })
}