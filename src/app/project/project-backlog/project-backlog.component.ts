import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { select } from '@ngrx/store';

import { AppState } from 'src/app/store/reducers';
import { getProjectBacklog, getProjectShorten } from 'src/app/store/selectors/project.selectors';
import * as TaskEditActions from 'src/app/store/actions/task-edit.actions';
import { Task } from 'src/app/models/task.model';
import { IProjectCommonData } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-backlog',
  templateUrl: './project-backlog.component.html',
  styleUrls: ['./project-backlog.component.scss']
})
export class ProjectBacklogComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;
  projectInfo: IProjectCommonData | null;
  backlogTasks: Task[] = [];
  taskFormOpen = false; // режим создания новой задачи

  constructor(
    private store: AppState
  ) { }

  // открыть или закрыть форму создания новой задачи
  toggleTaskForm() {
    if (this.taskFormOpen) {
      this.store.dispatch(TaskEditActions.closeTaskEdit())
    } else {
      this.store.dispatch(TaskEditActions.openTaskEdit({
        task: null
      }))
    }
  }

  ngOnInit(): void {
    this.storeSub = this.store.pipe(
      select(state => state.editTask.open),
      switchMap(isOpen => {
        this.taskFormOpen = isOpen;
        return this.store.select(getProjectShorten)
      }),
      switchMap((prjData) => {
        this.projectInfo = prjData;
        return this.store.select(getProjectBacklog)
      })
    ).subscribe(backlog => {
      this.backlogTasks = backlog ?? [] as Task[];
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(TaskEditActions.closeTaskEdit());
    this.storeSub.unsubscribe()
  } 

}