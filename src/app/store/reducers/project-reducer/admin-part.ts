import * as AdminActions from '../../actions/admin.actions';
import { projectFactory } from "src/app/models/project.model";
import { updateObject } from "src/app/shared/utils/update-object";
import { ProjectReduceFunction } from "./project.reducer";

// admin reduce functions

export const acceptUserStart: ProjectReduceFunction<typeof AdminActions.acceptUserStart> =
(state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  })
}

// успешное добавление пользователя из очереди в участники проекта
export const acceptUserSuccess: ProjectReduceFunction<typeof AdminActions.acceptUserSuccess> =
(state, action) => {
  if (!state.project) return state;
  const project = projectFactory(state.project);
  // убираем пользователя из очереди
  project.queue = project.queue.filter(user => {
    return user.userId !== action.userId
  });
  // добавляем пользователя в участники
  project.users = [...project.users, {
    _id: action.userId,
    username: action.username
  }];
  return updateObject(state, {
    project: project,
    loading: false
  })
}

export const acceptUserFail: ProjectReduceFunction<typeof AdminActions.acceptUserFail> =
(state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  })
}

export const rejectUserStart: ProjectReduceFunction<typeof AdminActions.rejectUserStart> =
(state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  })
}

// успешное удаление пользователя из очереди на вступление в проект
export const rejectUserSuccess: ProjectReduceFunction<typeof AdminActions.rejectUserSuccess> =
(state, action) => {
  if (!state.project) return state;
  const project = projectFactory(state.project);
  project.queue = project.queue.filter(user => {
    return user.userId !== action.userId
  });
  return updateObject(state, {
    project: project,
    loading: false
  })
}

export const rejectUserFail: ProjectReduceFunction<typeof AdminActions.rejectUserFail> =
(state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  })
}