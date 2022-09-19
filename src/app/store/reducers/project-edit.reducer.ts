import { createReducer, on } from "@ngrx/store";

import { updateObject } from "src/app/shared/utils/update-object";
import * as Actions from '../actions/project-edit.actions';

export interface IEditProject {
  _id: string;
  title: string;
  description: string;
}

export interface EditProjectState {
  project: IEditProject | null,
  open: boolean;
};

const initialState: EditProjectState = {
  project: null,
  open: false
};

interface ReduceFunction <T extends (...args: any[]) => any> {
  (
    state: EditProjectState,
    action: ReturnType<T>
  ) : EditProjectState
};

export const editProjectReducer = createReducer(
  initialState,
  on(Actions.openProjectEdit, (state, action) => openProjectEditReduce(state, action)),
  on(Actions.closeProjectEdit, (state, action) => closeProjectEditReduce(state, action))
);

// reduce functions

const openProjectEditReduce: ReduceFunction<typeof Actions.openProjectEdit> =
(state, action) => {
  return updateObject(state, {
    open: true,
    project: action.project ?? null
  })
}

const closeProjectEditReduce: ReduceFunction<typeof Actions.closeProjectEdit> =
(state, action) => {
  return updateObject(state, {
    open: false,
    project: null
  })
}