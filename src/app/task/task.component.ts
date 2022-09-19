import { Component, Input } from '@angular/core';

import { IterationTasksType } from '../models/iteration.model';
import { Task } from '../models/task.model';
import { openTaskEdit } from '../store/actions/task-edit.actions';
import { deleteTaskStart } from '../store/actions/task.actions';
import { AppState } from '../store/reducers';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task: Task;
  @Input() iterationId?: string;
  @Input() iterationStorage?: IterationTasksType;

  constructor(
    private store: AppState
  ) {}

  onUpdate() {
    this.store.dispatch(openTaskEdit({
      task: { 
        ...this.task, 
        iterationStorage: this.iterationStorage ?? null
      }
    }))
  }

  onDelete() {
    this.store.dispatch(deleteTaskStart({
      _id: this.task._id,
      projectId: this.task.projectId,
      iterationId: this.iterationId,
      iterationStorage: this.iterationStorage
    }))
  }
}