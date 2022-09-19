import { createSelector } from "@ngrx/store";

import { Iteration, ShortenIteration } from "src/app/models/iteration.model";
import { IProjectCommonData } from "src/app/models/project.model";
import { IAppState } from "../reducers";

// selectors

// получить проект
export const getProject = createSelector(
  (state: IAppState) => state.project,
  (project) => project.project
);

// получить бэклог
export const getProjectBacklog = createSelector(
  getProject,
  (project) => project?.backlog
);

// получить _id текущего проекта
export const getProjectId = createSelector(
  getProject,
  (project) => project?._id
)

// получить итерации проекта
export const getIterations = createSelector(
  getProject,
  (project) => project?.iterations ?? [] as Iteration[]
);

// возвращает только названия и даты создания итераций
export const getShortenIterations = createSelector(
  getIterations,
  (iterations) => iterations.map(iter => {
    return (<ShortenIteration>{
      title: iter.title,
      createdAt: iter.createdAt,
      _id: iter._id
    })
  })
);

// _id, title, createAt, description and etc.
export const getProjectShorten = createSelector(
  getProject,
  (project) => {
    if (!project) return null;
    return {
      _id: project._id, 
      title: project.title, 
      queue: project.queue,
      users: project.users,
      description: project.description, 
      createdAt: project.createdAt
    } as IProjectCommonData
  }
);

// get userId
const getUserId = createSelector(
  (state: IAppState) => state.auth,
  (auth) => auth.userId
);

// get project admin id
const getAdminId = createSelector(
  getProject,
  (project) => project?.admin
)

// compare project admin id and current user id
export const userIsAdmin = createSelector(
  getUserId,
  getAdminId,
  (userId, adminId) => {
    if (userId && adminId && userId === adminId) {
      return true
    } else {
      return false
    }
  }
)

// получить данные о ошибке в проекте
const getProjectError = createSelector(
  (state: IAppState) => state.project,
  projectInfo => projectInfo.error
)

// получить данные об ошибке в списке проектов
const getProjectListError = createSelector(
  (state: IAppState) => state.projectsList,
  projectList => projectList.projectsError
)

// получить глобальную ошибку
export const getError = createSelector(
  getProjectError,
  getProjectListError,
  (err1, err2) => {
    return err1 || err2
  }
)