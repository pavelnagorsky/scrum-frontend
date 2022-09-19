import { ITask, taskFactory } from "./task.model";

export type IterationTasksType = 'TODO' | 'DOING' | 'DONE';

export interface IIteration {
  _id: string;
  title: string;
  deadline: string;
  tasks: {
    "TODO": ITask[],
    "DOING": ITask[],
    "DONE": ITask[]
  };
  createdAt: string;
};

export interface ShortenIteration {
  title: string;
  createdAt: string;
  _id: string;
};

export class Iteration implements IIteration {
  _id: string;
  title: string;
  deadline: string;
  tasks: {
    "TODO": ITask[],
    "DOING": ITask[],
    "DONE": ITask[]
  };
  createdAt: string;

  constructor(
    _id: string,
    title: string,
    deadline: string,
    tasks: {
      "TODO": ITask[],
      "DOING": ITask[],
      "DONE": ITask[]
    },
    createdAt: string
  ) {
    this._id = _id;
    this.title = title;
    this.deadline = deadline;
    this.tasks = tasks;
    this.createdAt = createdAt;
  }
}

// фабрика по созданию итераций
export const iterationFactory = (iter: IIteration) => {
  const iterationTasks: typeof iter.tasks = {
    'TODO': [],
    'DOING': [],
    'DONE': []
  };
  for (let status of Object.keys(iter.tasks)) {
    iterationTasks[status as keyof typeof iter.tasks] =
    iter.tasks[status as keyof typeof iter.tasks].map(sectionTask => {
      return taskFactory(sectionTask);
    })
  }
  return new Iteration(
    iter._id,
    iter.title,
    iter.deadline,
    iterationTasks,
    iter.createdAt
  )
}