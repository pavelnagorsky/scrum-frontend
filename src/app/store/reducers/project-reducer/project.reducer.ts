import { createReducer, on } from "@ngrx/store";

// actions that call changes in project state
import * as ProjectActions from '../../actions/project.actions';
import * as IterationActions from '../../actions/iteration.actions';
import * as AdminActions from '../../actions/admin.actions';
import * as TaskActions from '../../actions/task.actions';
// reduce functions
import * as ProjectReduce from './project-part';
import * as AdminReduce from './admin-part';
import * as IterationReduce from './iteration-part';
import * as TaskReduce from './task-part';
// util
import { Project } from "src/app/models/project.model";

export interface ProjectState {
  project: Project | null,
  loading: boolean;
  error: boolean;
};

const initialState: ProjectState = {
  project: null,
  loading: false,
  error: false
};

export interface ProjectReduceFunction <T extends (...args: any[]) => any> {
  (
    state: ProjectState,
    action: ReturnType<T>
  ) : ProjectState
};

// [СТРАШНО]
export const projectReducer = createReducer(
  initialState,
  // project reduce
  on(ProjectActions.fetchProjectStart, (state, action) => ProjectReduce.fetchProjectStartReduce(state, action)),
  on(ProjectActions.fetchProjectSuccess, (state, action) => ProjectReduce.fetchProjectSuccessReduce(state, action)),
  on(ProjectActions.fetchProjectFail, (state, action) => ProjectReduce.fetchProjectFailReduce(state, action)),
  on(ProjectActions.updateProjectStart, (state, action) => ProjectReduce.updateProjectStartReduce(state, action)),
  on(ProjectActions.updateProjectSuccess, (state, action) => ProjectReduce.updateProjectSuccessReduce(state, action)),
  on(ProjectActions.updateProjectFail, (state, action) => ProjectReduce.updateProjectFailReduce(state, action)),
  on(ProjectActions.createProjectSuccess, (state, action) => ProjectReduce.createProjectSuccessReduce(state, action)),
  on(ProjectActions.deleteProjectStart, (state, action) => ProjectReduce.deleteProjectStartReduce(state, action)),
  on(ProjectActions.deleteProjectSuccess, (state, action) => ProjectReduce.deleteProjectSuccessReduce(state, action)),
  on(ProjectActions.deleteProjectFail, (state, action) => ProjectReduce.deleteProjectFailReduce(state, action)),
  on(ProjectActions.leaveProjectStart, (state, action) => ProjectReduce.leaveProjectStartReduce(state, action)),
  on(ProjectActions.leaveProjectSuccess, (state, action) => ProjectReduce.leaveProjectSuccessReduce(state, action)),
  on(ProjectActions.leaveProjectFail, (state, action) => ProjectReduce.leaveProjectFailReduce(state, action)),
  on(ProjectActions.clearProjectInfo, (state, action) => ProjectReduce.clearProjectInfoReduce(state, action)),
  on(ProjectActions.clearError, (state, action) => ProjectReduce.clearErrorReduce(state, action)),
  // admin reduce
  on(AdminActions.acceptUserStart, (state, action) => AdminReduce.acceptUserStart(state, action)),
  on(AdminActions.acceptUserSuccess, (state, action) => AdminReduce.acceptUserSuccess(state, action)),
  on(AdminActions.acceptUserFail, (state, action) => AdminReduce.acceptUserFail(state, action)),
  on(AdminActions.rejectUserStart, (state, action) => AdminReduce.rejectUserStart(state, action)),
  on(AdminActions.rejectUserSuccess, (state, action) => AdminReduce.rejectUserSuccess(state, action)),
  on(AdminActions.rejectUserFail, (state, action) => AdminReduce.rejectUserFail(state, action)),
  // iterations reduce
  on(IterationActions.createIterationStart, (state, action) => IterationReduce.createIterationStartReduce(state, action)),
  on(IterationActions.createIterationSuccess, (state, action) => IterationReduce.createIterationSuccessReduce(state, action)),
  on(IterationActions.createIterationFail, (state, action) => IterationReduce.createIterationFailReduce(state, action)),
  on(IterationActions.updateIterationSuccess, (state, action) => IterationReduce.updateIterationSuccessReduce(state, action)),
  on(IterationActions.updateIterationFail, (state, action) => IterationReduce.updateIterationFailReduce(state, action)),
  on(IterationActions.updateIterationStart, (state, action) => IterationReduce.updateIterationStartReduce(state, action)),
  on(IterationActions.deleteIterationSuccess, (state, action) => IterationReduce.deleteIterationSuccessReduce(state, action)),
  on(IterationActions.deleteIterationFail, (state, action) => IterationReduce.deleteIterationFailReduce(state, action)),
  on(IterationActions.deleteIterationStart, (state, action) => IterationReduce.deleteIterationStartReduce(state, action)),
  // tasks reduce
  on(TaskActions.createTaskStart, (state, action) => TaskReduce.createTaskStartReduce(state, action)),
  on(TaskActions.createTaskSuccess, (state, action) => TaskReduce.createTaskSuccessReduce(state, action)),
  on(TaskActions.createTaskFail, (state, action) => TaskReduce.createTaskFailReduce(state, action)),
  on(TaskActions.updateTaskStart, (state, action) => TaskReduce.updateTaskStartReduce(state, action)),
  on(TaskActions.updateTaskSuccess, (state, action) => TaskReduce.updateTaskSuccessReduce(state, action)),
  on(TaskActions.updateTaskFail, (state, action) => TaskReduce.updateTaskFailReduce(state, action)),
  on(TaskActions.deleteTaskStart, (state, action) => TaskReduce.deleteTaskStartReduce(state, action)),
  on(TaskActions.deleteTaskSuccess, (state, action) => TaskReduce.deleteTaskSuccessReduce(state, action)),
  on(TaskActions.deleteTaskFail, (state, action) => TaskReduce.deleteTaskFailReduce(state, action)),
  on(TaskActions.moveTaskStart, (state, action) => TaskReduce.moveTaskStartReduce(state, action)),
  on(TaskActions.moveTaskSuccess, (state, action) => TaskReduce.moveTaskSuccessReduce(state, action)),
  on(TaskActions.moveTaskFail, (state, action) => TaskReduce.moveTaskFailReduce(state, action))
)