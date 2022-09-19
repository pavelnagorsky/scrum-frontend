import { createAction, props } from "@ngrx/store";

import { IEditProject } from "../reducers/project-edit.reducer";
import { EditProjectTypes } from "./action-types";

export const openProjectEdit = createAction(
  EditProjectTypes.OPEN_PROJECT_EDIT,
  props<{ project: IEditProject | null }>()
)

export const closeProjectEdit = createAction(
  EditProjectTypes.CLOSE_PROJECT_EDIT
)