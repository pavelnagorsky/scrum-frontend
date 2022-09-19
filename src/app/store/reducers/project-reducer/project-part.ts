import { updateObject } from "src/app/shared/utils/update-object"
import { ProjectReduceFunction } from "./project.reducer"
import * as ProjectActions from '../../actions/project.actions';
import { projectFactory } from "src/app/models/project.model";

// project reduce functions

export const fetchProjectStartReduce: ProjectReduceFunction<typeof ProjectActions.fetchProjectStart> =
(state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  })
}

export const fetchProjectSuccessReduce: ProjectReduceFunction<typeof ProjectActions.fetchProjectSuccess> =
(state, action) => {
  return updateObject(state, {
    project: action.project,
    loading: false
  })
}

export const fetchProjectFailReduce: ProjectReduceFunction<typeof ProjectActions.fetchProjectFail> =
(state, action) => {
  return updateObject(state, {
    project: null,
    loading: false,
    error: true
  })
}

export const updateProjectStartReduce: ProjectReduceFunction<typeof ProjectActions.updateProjectStart> =
(state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  })
}

// обновление названия и описания проекта
export const updateProjectSuccessReduce: ProjectReduceFunction<typeof ProjectActions.updateProjectSuccess> =
(state, action) => {
  if (!state.project) return state;
  const project = projectFactory(state.project);
  project.title = action.project.title;
  project.description = action.project.description;
  return updateObject(state, {
    project: project,
    loading: false
  })
}

export const updateProjectFailReduce: ProjectReduceFunction<typeof ProjectActions.updateProjectFail> =
(state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  })
}

// при создании нового проекта заменям текущий проект на созданный
export const createProjectSuccessReduce: ProjectReduceFunction<typeof ProjectActions.createProjectSuccess> =
(state, action) => {
  return updateObject(state, {
    project: action.project,
    loading: false,
    error: false
  })
}

export const deleteProjectStartReduce: ProjectReduceFunction<typeof ProjectActions.deleteProjectStart> =
(state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  })
}

// при успешном удалении проекта
export const deleteProjectSuccessReduce: ProjectReduceFunction<typeof ProjectActions.deleteProjectSuccess> =
(state, action) => {
  return updateObject(state, {
    project: null,
    loading: false
  })
}

export const deleteProjectFailReduce: ProjectReduceFunction<typeof ProjectActions.deleteProjectFail> =
(state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  })
}

export const leaveProjectStartReduce: ProjectReduceFunction<typeof ProjectActions.leaveProjectStart> =
(state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  })
}

// успешно покинуть проект
export const leaveProjectSuccessReduce: ProjectReduceFunction<typeof ProjectActions.leaveProjectSuccess> =
(state, action) => {
  return updateObject(state, {
    project: null,
    loading: false
  })
}

export const leaveProjectFailReduce: ProjectReduceFunction<typeof ProjectActions.leaveProjectFail> =
(state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  })
}

// очистить данные при логауте
export const clearProjectInfoReduce: ProjectReduceFunction<typeof ProjectActions.clearProjectInfo> =
(state, action) => {
  return updateObject(state, {
    project: null,
    loading: false,
    error: false
  })
}

// убрать ошибку
export const clearErrorReduce: ProjectReduceFunction<typeof ProjectActions.clearError> =
(state, action) => {
  return updateObject(state, {
    error: false
  })
}