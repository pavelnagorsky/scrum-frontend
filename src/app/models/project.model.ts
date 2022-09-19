import { IIteration, Iteration, iterationFactory } from "./iteration.model";
import { ITask, Task, taskFactory } from "./task.model";

export interface IProjectCommonData {
  title: string;
  description: string;
  users: IProjectUser[],
  queue: IUserQueue[],
  createdAt: string;
  _id: string;
}

export interface IProjectUser {
  username: string;
  _id: string;
};

export interface IUserQueue {
  userId: string;
  username: string;
  email: string;
};

export interface IProject {
  _id: string;
  title: string;
  description: string;
  admin: string;
  users: IProjectUser[];
  queue: IUserQueue[];
  backlog: ITask[];
  iterations: IIteration[];
  createdAt: string;
}

export class Project implements IProject {
  _id: string;
  title: string;
  description: string;
  admin: string;
  users: IProjectUser[];
  queue: IUserQueue[];
  backlog: ITask[];
  iterations: IIteration[];
  createdAt: string;

  constructor(
    _id: string,
    title: string,
    description: string,
    admin: string,
    users: IProjectUser[],
    queue: IUserQueue[],
    backlog: ITask[],
    iterations: IIteration[],
    createdAt: string
  ) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.admin = admin;
    this.users = users;
    this.queue = queue;
    this.backlog = backlog;
    this.iterations = iterations;
    this.createdAt = createdAt;
  }
}

// создание экземпляра класса проекта. позволяет убедиться в наличии нужных полей и отсутсвии лишних
export const  projectFactory = (projectData: IProject) => {
  // создаем бэклог
  const backlog: Task[] = projectData.backlog.map(task => {
    return taskFactory(task)
  });
  // создаем итерации
  const iterations: Iteration[] = projectData.iterations.map(
    iter => iterationFactory(iter)
  );
  // создаем проект
  const project = new Project(
    projectData._id,
    projectData.title,
    projectData.description,
    projectData.admin,
    projectData.users,
    projectData.queue,
    backlog,
    iterations,
    projectData.createdAt
  );
  return project;
}