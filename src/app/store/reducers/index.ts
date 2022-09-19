import { Injectable } from '@angular/core';
import { ActionReducerMap, Store } from '@ngrx/store';

import { authReducer, AuthState } from './auth.reducer';
import { editIterationReducer, EditIterationState } from './iteration-edit.reducer';
import { editProjectReducer, EditProjectState } from './project-edit.reducer';
import { projectReducer, ProjectState } from './project-reducer/project.reducer';
import { projectsListReducer, ProjectsListState } from './projects-list.reducer';
import { editTaskReducer, EditTaskState } from './task-edit.reducer';

export interface IAppState {
  auth: AuthState;
  projectsList: ProjectsListState;
  project: ProjectState;
  editIteration: EditIterationState,
  editProject: EditProjectState,
  editTask: EditTaskState
};

@Injectable({
  providedIn: 'root'
})
export class AppState extends Store<IAppState> {};

export const reducers: ActionReducerMap<IAppState, any> = {
  auth: authReducer,
  projectsList: projectsListReducer,
  project: projectReducer,
  editIteration: editIterationReducer,
  editProject: editProjectReducer,
  editTask: editTaskReducer
};