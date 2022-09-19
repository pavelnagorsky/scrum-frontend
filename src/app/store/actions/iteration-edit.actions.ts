import { createAction, props } from "@ngrx/store";

import { IEditedIteration } from "../reducers/iteration-edit.reducer";
import { EditIterationTypes } from "./action-types";

export const openIterationEdit = createAction(
  EditIterationTypes.OPEN_ITERATION_EDIT,
  props<{ iteration: IEditedIteration | null }>()
)

export const closeIterationEdit = createAction(
  EditIterationTypes.CLOSE_ITERATION_EDIT
)