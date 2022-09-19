import { createReducer, on } from "@ngrx/store";

import * as Actions from '../actions/iteration-edit.actions';
import { updateObject } from "src/app/shared/utils/update-object";

export interface IEditedIteration {
  title: string;
  _id: string;
  deadline: string;
}

export interface EditIterationState {
  iteration: IEditedIteration | null,
  open: boolean;
};

const initialState: EditIterationState = {
  iteration: null,
  open: false
};

interface ReduceFunction <T extends (...args: any[]) => any> {
  (
    state: EditIterationState,
    action: ReturnType<T>
  ) : EditIterationState
};

export const editIterationReducer = createReducer(
  initialState,
  on(Actions.openIterationEdit, (state, action) => openIterationEditReduce(state, action)),
  on(Actions.closeIterationEdit, (state, action) => closeIterationEditReduce(state, action))
);

// reduce functions

const openIterationEditReduce: ReduceFunction<typeof Actions.openIterationEdit> =
(state, action) => {
  return updateObject(state, {
    open: true,
    iteration: action.iteration ?? null
  })
}

const closeIterationEditReduce: ReduceFunction<typeof Actions.closeIterationEdit> =
(state, action) => {
  return updateObject(state, {
    open: false,
    iteration: null
  })
}