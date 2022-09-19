import { createAction, props } from "@ngrx/store";

import { IterationTasksType } from "src/app/models/iteration.model";
import { 
  ICreateTask, 
  IDeleteTask, 
  IMoveTaskRequest, 
  IUpdateTask, 
  Task 
} from "src/app/models/task.model";
import { TaskActionTypes } from "./action-types";

export const createTaskStart = createAction(
  TaskActionTypes.CREATE_TASK_START,
  props<{ task: ICreateTask }>()
)

export const createTaskFail = createAction(
  TaskActionTypes.CREATE_TASK_FAIL
)

export const createTaskSuccess = createAction(
  TaskActionTypes.CREATE_TASK_SUCCESS,
  props<{ 
    task: Task,
    iterationId?: string
  }>()
)

export const updateTaskStart = createAction(
  TaskActionTypes.UPDATE_TASK_START,
  props<{ task: IUpdateTask }>()
)

export const updateTaskSuccess = createAction(
  TaskActionTypes.UPDATE_TASK_SUCCESS,
  props<{ 
    task: Task, 
    iterationId?: string, 
    iterationStorage?: IterationTasksType 
  }>()
)

export const updateTaskFail = createAction(
  TaskActionTypes.UPDATE_TASK_FAIL
)

export const deleteTaskStart = createAction(
  TaskActionTypes.DELETE_TASK_START,
  props<IDeleteTask>()
)

export const deleteTaskSuccess = createAction(
  TaskActionTypes.DELETE_TASK_SUCCESS,
  props<IDeleteTask>()
)

export const deleteTaskFail = createAction(
  TaskActionTypes.DELETE_TASK_FAIL
)

export const moveTaskStart = createAction(
  TaskActionTypes.MOVE_TASK_START,
  props<{ 
    moveData: IMoveTaskRequest,
    task: Task 
  }>()
)

export const moveTaskSuccess = createAction(
  TaskActionTypes.MOVE_TASK_SUCCESS,
  props<{ 
    moveData: IMoveTaskRequest, 
    task: Task
  }>()
)

export const moveTaskFail = createAction(
  TaskActionTypes.MOVE_TASK_FAIL
)