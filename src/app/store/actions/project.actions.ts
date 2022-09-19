import { createAction, props } from "@ngrx/store";

import { Project } from "src/app/models/project.model";
import { IEditProject } from "../reducers/project-edit.reducer";
import { ProjectActionTypes } from './action-types'

export const fetchProjectStart = createAction(
  ProjectActionTypes.FETCH_PROJECT_START,
  props<{ projectId: string }>()
)

export const fetchProjectFail = createAction(
  ProjectActionTypes.FETCH_PROJECT_FAIL
)

export const fetchProjectSuccess = createAction(
  ProjectActionTypes.FETCH_PROJECT_SUCCESS,
  props<{ project: Project }>()
)

export const createProjectStart = createAction(
  ProjectActionTypes.CREATE_PROJECT_START,
  props<{ title: string, description: string }>()
)

export const createProjectSuccess = createAction(
  ProjectActionTypes.CREATE_PROJECT_SUCCESS,
  props<{ project: Project }>()
)

export const createProjectFail = createAction(
  ProjectActionTypes.CREATE_PROJECT_FAIL
)

export const updateProjectStart = createAction(
  ProjectActionTypes.UPDATE_PROJECT_START,
  props<{ project: IEditProject }>()
)

export const updateProjectSuccess = createAction(
  ProjectActionTypes.UPDATE_PROJECT_SUCCESS,
  props<{ project: IEditProject }>()
)

export const updateProjectFail = createAction(
  ProjectActionTypes.UPDATE_PROJECT_FAIL
)

export const deleteProjectStart = createAction(
  ProjectActionTypes.DELETE_PROJECT_START,
  props<{ projectId: string }>()
)

export const deleteProjectSuccess = createAction(
  ProjectActionTypes.DELETE_PROJECT_SUCCESS,
  props<{ projectId: string }>()
)

export const deleteProjectFail = createAction(
  ProjectActionTypes.DELETE_PROJECT_FAIL
)

export const leaveProjectStart = createAction(
  ProjectActionTypes.LEAVE_PROJECT_START,
  props<{ projectId: string, userId: string }>()
)

export const leaveProjectSuccess = createAction(
  ProjectActionTypes.LEAVE_PROJECT_SUCCESS,
  props<{ userId: string, projectId: string }>()
)

export const leaveProjectFail = createAction(
  ProjectActionTypes.UPDATE_PROJECT_FAIL
)

export const clearProjectInfo = createAction(
  ProjectActionTypes.CLEAR_PROJECT_INFO
)

export const clearError = createAction(
  ProjectActionTypes.CLEAR_ERROR
)