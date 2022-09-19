import { projectFactory } from "src/app/models/project.model";
import { updateObject } from "src/app/shared/utils/update-object";
import * as IterationActions from '../../actions/iteration.actions';
import { ProjectReduceFunction } from "./project.reducer";

// iteration reduce functions

export const createIterationStartReduce: ProjectReduceFunction<typeof IterationActions.createIterationStart> =
(state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  })
}

// создание итерации
export const createIterationSuccessReduce: ProjectReduceFunction<typeof IterationActions.createIterationSuccess> =
(state, action) => {
  if (!state.project) {
    return state;
  }
  const project = projectFactory(state.project);
  project.iterations.push(action.iteration);
  return updateObject(state, {
    project: project,
    loading: false
  })
}

export const createIterationFailReduce: ProjectReduceFunction<typeof IterationActions.createIterationFail> =
(state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  })
}

export const updateIterationStartReduce: ProjectReduceFunction<typeof IterationActions.updateIterationStart> =
(state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  })
}

// обновление итерации
export const updateIterationSuccessReduce: ProjectReduceFunction<typeof IterationActions.updateIterationSuccess> =
(state, action) => {
  if (!state.project) {
    return state;
  }
  const project = projectFactory(state.project);
  const iterIndex = project.iterations.findIndex(iter => {
    return iter._id === action.iteration._id
  });
  project.iterations[iterIndex].title = action.iteration.title;
  project.iterations[iterIndex].deadline = action.iteration.deadline;
  return updateObject(state, {
    project: project,
    loading: false
  })
}

export const updateIterationFailReduce: ProjectReduceFunction<typeof IterationActions.updateIterationFail> =
(state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  })
}

export const deleteIterationStartReduce: ProjectReduceFunction<typeof IterationActions.deleteIterationStart> =
(state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  })
}

export const deleteIterationFailReduce: ProjectReduceFunction<typeof IterationActions.deleteIterationFail> =
(state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  })
}

// успешное удаление итерации
export const deleteIterationSuccessReduce: ProjectReduceFunction<typeof IterationActions.deleteIterationSuccess> =
(state, action) => {
  return updateObject(state, {
    loading: false,
    project: action.project
  })
}