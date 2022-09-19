import { createAction, props } from "@ngrx/store";

import { ShortenProject } from "../reducers/projects-list.reducer";
import { ProjectsListTypes } from "./action-types";

export const fetchProjectsStart = createAction(
  ProjectsListTypes.FETCH_PROJECTS_START
);

export const fetchProjectsSuccess = createAction(
  ProjectsListTypes.FETCH_PROJECTS_SUCCESS,
  props<{ projects: ShortenProject[] }>()
);

export const fetchProjectsFail = createAction(
  ProjectsListTypes.FETCH_PROJECTS_FAIL
);

export const joinProjectStart = createAction(
  ProjectsListTypes.JOIN_PROJECT_START,
  props<{ projectId: string }>()
);

export const joinProjectSuccess = createAction(
  ProjectsListTypes.JOIN_PROJECT_SUCCESS
);

export const joinProjectFail = createAction(
  ProjectsListTypes.JOIN_PROJECT_FAIL,
  props<{ errorMessage: string }>()
);

export const clearJoinProjectInfo = createAction(
  ProjectsListTypes.JOIN_PROJECT_CLEAR_INFO
);

export const clearProjectsListInfo = createAction(
  ProjectsListTypes.CLEAR_INFO
);