import { createAction, props } from "@ngrx/store";

import { ITaskEdit } from "../reducers/task-edit.reducer";
import { EditTaskTypes } from "./action-types";

export const openTaskEdit = createAction(
  EditTaskTypes.OPEN_TASK_EDIT,
  props<{ task: ITaskEdit | null }>()
)

export const closeTaskEdit = createAction(
  EditTaskTypes.CLOSE_TASK_EDIT
)