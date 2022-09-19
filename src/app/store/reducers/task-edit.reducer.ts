import { createReducer, on } from "@ngrx/store";

import * as Actions from '../actions/task-edit.actions';
import { updateObject } from "src/app/shared/utils/update-object";
import { IterationTasksType } from "src/app/models/iteration.model";

export interface ITaskEdit {
  title: string;
  _id: string;
  projectId: string;
  description: string;
  storyPoints: number;
  iterationStorage: IterationTasksType | null;
}

export interface EditTaskState {
  task: ITaskEdit | null,
  open: boolean;
};

const initialState: EditTaskState = {
  task: null,
  open: false
};

interface ReduceFunction <T extends (...args: any[]) => any> {
  (
    state: EditTaskState,
    action: ReturnType<T>
  ) : EditTaskState
};

export const editTaskReducer = createReducer(
  initialState,
  on(Actions.openTaskEdit, (state, action) => openTaskEditReduce(state, action)),
  on(Actions.closeTaskEdit, (state, action) => closeTaskEditReduce(state, action))
);

// reduce functions

const openTaskEditReduce: ReduceFunction<typeof Actions.openTaskEdit> =
(state, action) => {
  return updateObject(state, {
    open: true,
    task: action.task ?? null
  })
}

const closeTaskEditReduce: ReduceFunction<typeof Actions.closeTaskEdit> =
(state, action) => {
  return updateObject(state, {
    open: false,
    task: null
  })
}