import { createReducer, on } from "@ngrx/store";

import * as Actions from '../actions/projects-list.actions';
import { updateObject } from "src/app/shared/utils/update-object";
import * as ProjectActions from '../actions/project.actions';

export interface ShortenProject {
  title: string;
  createdAt: string;
  _id: string;
}

export interface ProjectsListState {
  projects: ShortenProject[];
  projectsLoading: boolean;
  projectsError: boolean;
  joinLoading: boolean;
  joinError: string | null;
  joinSuccess: boolean;
}

const initialState: ProjectsListState = {
  projects: [],
  projectsLoading: false,
  projectsError: false,
  joinLoading: false,
  joinError: null,
  joinSuccess: false
}

interface ReduceFunction <T extends (...args: any[]) => any> {
  (
    state: ProjectsListState,
    action: ReturnType<T>
  ) : ProjectsListState
}

export const projectsListReducer = createReducer(
  initialState,
  // reduce from project actions
  on(ProjectActions.createProjectStart, (state, action) => createProjectStartReduce(state, action)),
  on(ProjectActions.createProjectSuccess, (state, action) => createProjectSuccessReduce(state, action)),
  on(ProjectActions.createProjectFail, (state, action) => createProjectFailReduce(state, action)),
  on(ProjectActions.updateProjectSuccess, (state, action) => updateProjectSuccessReduce(state, action)),
  on(ProjectActions.deleteProjectSuccess, (state, action) => deleteProjectSuccessReduce(state, action)),
  on(ProjectActions.leaveProjectSuccess, (state, action) => leaveProjectSuccessReduce(state, action)),
  on(ProjectActions.clearError, (state, action) => clearErrorReduce(state, action)),
  // reduce from project-list actions
  on(Actions.fetchProjectsStart, (state, action) => fetchProjectsStartReduce(state, action)),
  on(Actions.fetchProjectsSuccess, (state, action) => fetchProjectsSuccessReduce(state, action)),
  on(Actions.fetchProjectsFail, (state, action) => fetchProjectsFailReduce(state, action)),
  on(Actions.joinProjectStart, (state, action) => joinProjectStartReduce(state, action)),
  on(Actions.joinProjectSuccess, (state, action) => joinProjectSuccessReduce(state, action)),
  on(Actions.joinProjectFail, (state, action) => joinProjectFailReduce(state, action)),
  on(Actions.clearJoinProjectInfo, (state, action) => clearJoinProjectInfoReduce(state, action)),
  on(Actions.clearProjectsListInfo, (state, action) => initialState)
);

// reduce functions from project-list actions

const fetchProjectsStartReduce: ReduceFunction<typeof Actions.fetchProjectsStart> =
(state, action) => {
  return updateObject(state, {
    projectsLoading: true,
    projectsError: false
  })
}

// успешное получения сокращенной информации о проектах с участием пользователя
const fetchProjectsSuccessReduce: ReduceFunction<typeof Actions.fetchProjectsSuccess> =
(state, action) => {
  return updateObject(state, {
    projects: action.projects,
    projectsLoading: false
  })
}

const fetchProjectsFailReduce: ReduceFunction<typeof Actions.fetchProjectsFail> =
(state, action) => {
  return updateObject(state, {
    projects: [],
    projectsLoading: false,
    projectsError: true
  })
}

const joinProjectStartReduce: ReduceFunction<typeof Actions.joinProjectStart> =
(state, action) => {
  return updateObject(state, {
    joinError: null,
    joinLoading: true,
    joinSuccess: false
  })
}

// успешная отправка запроса на вступление в проект
const joinProjectSuccessReduce: ReduceFunction<typeof Actions.joinProjectSuccess> =
(state, action) => {
  return updateObject(state, {
    joinLoading: false,
    joinSuccess: true
  })
}

const joinProjectFailReduce: ReduceFunction<typeof Actions.joinProjectFail> =
(state, action) => {
  return updateObject(state, {
    joinError: action.errorMessage,
    joinLoading: false
  })
}

// убрать информацию о успешной/неудачной попытке отправки запроса на участие в проекте
const clearJoinProjectInfoReduce: ReduceFunction<typeof Actions.clearJoinProjectInfo> =
(state, action) => {
  return updateObject(state, {
    joinSuccess: false,
    joinError: null
  })
}

// reduce functions from project actions

const createProjectStartReduce: ReduceFunction<typeof ProjectActions.createProjectStart> = 
(state, action) => {
  return updateObject(state, {
    projectsLoading: true,
    projectsError: false
  })
}

// добавление в список проектов с участием пользователя новосозданного проекта
const createProjectSuccessReduce: ReduceFunction<typeof ProjectActions.createProjectSuccess> = 
(state, action) => {
  const projects = state.projects.map(shortenProject => {
    return {...shortenProject}
  });
  projects.push({
    _id: action.project._id,
    title: action.project.title,
    createdAt: action.project.createdAt
  });
  return updateObject(state, {
    projects: projects,
    projectsLoading: false,
    projectsError: false
  })
}

const createProjectFailReduce: ReduceFunction<typeof ProjectActions.createProjectFail> = 
(state, action) => {
  return updateObject(state, {
    projectsLoading: false,
    projectsError: true
  })
}

// при успешном обновлении проекта, обновляем его название в списке
const updateProjectSuccessReduce: ReduceFunction<typeof ProjectActions.updateProjectSuccess> =
(state, action) => {
  const projects = state.projects.map(shortenProject => {
    if (shortenProject._id === action.project._id) {
      return updateObject(shortenProject, {
        title: action.project.title
      })
    } else {
      return {...shortenProject}
    }
  });
  return updateObject(state, {
    projects: projects,
    projectsLoading: false,
    projectsError: false
  })
}

// при успешном удалении проекта убираем этот проект из списка
const deleteProjectSuccessReduce: ReduceFunction<typeof ProjectActions.deleteProjectSuccess> =
(state, action) => {
  const projects = state.projects.map(shortenProject => {
    return {...shortenProject}
  });
  const filteredProjects = projects.filter(pr => {
    return pr._id !== action.projectId
  });
  return updateObject(state, {
    projects: filteredProjects,
    projectsLoading: false,
    projectsError: false
  })
}

// при успешном покидании проекта удаляем этот проект из списка
const leaveProjectSuccessReduce: ReduceFunction<typeof ProjectActions.leaveProjectSuccess> =
(state, action) => {
  const projects = state.projects.map(shortenProject => {
    return {...shortenProject}
  });
  const filteredProjects = projects.filter(pr => {
    return pr._id !== action.projectId
  });
  return updateObject(state, {
    projects: filteredProjects,
    projectsLoading: false,
    projectsError: false
  })
}

// убрать ошибку
const clearErrorReduce: ReduceFunction<typeof ProjectActions.clearError> =
(state, action) => {
  return updateObject(state, {
    projectsError: false
  })
}