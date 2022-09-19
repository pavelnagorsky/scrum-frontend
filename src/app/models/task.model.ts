import { IterationTasksType } from "./iteration.model";

export interface ICreateTask {
  title: string;
	description: string;
	storyPoints: number;
	projectId: string;
  iterationId?: string;
}

export interface IUpdateTask extends ICreateTask {
  _id: string;
  iterationStorage?: IterationTasksType;
}

export interface IDeleteTask {
  _id: string;
  projectId: string;
  iterationId?: string;
  iterationStorage?: IterationTasksType;
}

export interface ITask extends ICreateTask {
  _id: string;
  createdAt: string;
}

export interface IMoveTaskRequest {
  moveFromBacklog: boolean;
  moveFromIteration: {
    iterationId: string;
    storage: IterationTasksType;
  } | null;
  moveToBacklog: boolean;
  moveToIteration: {
    iterationId: string;
    storage: IterationTasksType;
  } | null;
}

export class Task implements ITask {
  _id: string;
  title: string;
	description: string;
	storyPoints: number;
	projectId: string;
  createdAt: string;

  constructor(
    _id: string,
    title: string,
    description: string,
  	storyPoints: number,
  	projectId: string,
    createdAt: string
  ) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.storyPoints = storyPoints;
    this.projectId = projectId;
    this.createdAt = createdAt;
  }
}

// фабрика по созданию задач
export const taskFactory = (task: ITask) => {
  return new Task(
    task._id,
    task.title,
    task.description,
    task.storyPoints,
    task.projectId,
    task.createdAt
  )
}