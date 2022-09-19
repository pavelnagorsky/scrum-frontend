import { createAction, props } from "@ngrx/store";

import { Iteration } from "src/app/models/iteration.model";
import { Project } from "src/app/models/project.model";
import { IterationActionTypes } from "./action-types";

export const createIterationStart = createAction(
  IterationActionTypes.CREATE_ITERATION_START,
  props<{ title: string, deadline: string, projectId: string }>()
);

export const createIterationFail = createAction(
  IterationActionTypes.CREATE_ITERATION_FAIL
);

export const createIterationSuccess = createAction(
  IterationActionTypes.CREATE_ITERATION_SUCCESS,
  props<{ iteration: Iteration }>()
);

export const updateIterationStart = createAction(
  IterationActionTypes.UPDATE_ITERATION_START,
  props<{ iterationId: string, title: string, deadline: string, projectId: string }>()
);

export const updateIterationFail = createAction(
  IterationActionTypes.UPDATE_ITERATION_FAIL
);

export const updateIterationSuccess = createAction(
  IterationActionTypes.UPDATE_ITERATION_SUCCESS,
  props<{ iteration: Iteration }>()
);

export const deleteIterationStart = createAction(
  IterationActionTypes.DELETE_ITERATION_START,
  props<{ projectId: string, iterationId: string, deleteTasks: boolean }>()
);

export const deleteIterationSuccess = createAction(
  IterationActionTypes.DELETE_ITERATION_SUCCESS,
  props<{project: Project}>()
);

export const deleteIterationFail = createAction(
  IterationActionTypes.DELETE_ITERATION_FAIL
);