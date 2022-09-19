import { createAction, props } from "@ngrx/store";

import { AdminActionTypes } from "./action-types";

export const acceptUserStart = createAction(
  AdminActionTypes.ACCEPT_USER_START,
  props<{ userId: string, projectId: string }>()
)

export const acceptUserSuccess = createAction(
  AdminActionTypes.ACCEPT_USER_SUCCESS,
  props<{ userId: string, username: string }>()
)

export const acceptUserFail = createAction(
  AdminActionTypes.ACCEPT_USER_FAIL
)

export const rejectUserStart = createAction(
  AdminActionTypes.REJECT_USER_START,
  props<{ userId: string, projectId: string }>()
)

export const rejectUserSuccess = createAction(
  AdminActionTypes.REJECT_USER_SUCCESS,
  props<{ userId: string }>()
)

export const rejectUserFail = createAction(
  AdminActionTypes.REJECT_USER_FAIL
)