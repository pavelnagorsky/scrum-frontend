import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IterationTasksType, ShortenIteration } from 'src/app/models/iteration.model';
import { IMoveTaskRequest, Task } from 'src/app/models/task.model';
import { moveTaskStart } from 'src/app/store/actions/task.actions';
import { AppState } from 'src/app/store/reducers';
import { getShortenIterations } from 'src/app/store/selectors/project.selectors';

@Component({
  selector: 'app-task-move',
  templateUrl: './task-move.component.html',
  styleUrls: ['./task-move.component.scss']
})
export class TaskMoveComponent implements OnInit, OnDestroy {
  @Input() task: Task;
  @Input() iterationId?: string;
  @Input() iterationStorage?: IterationTasksType;
  iterations: ShortenIteration[];
  private storeSub: Subscription;

  constructor(
    private store: AppState
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.pipe(
      select(getShortenIterations)
    ).subscribe(iterations => {
      this.iterations = iterations
    })
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe()
  }

  // перемещение задачи в рамках проекта
  onMove(iterId?: string, iterStorage?: IterationTasksType) { // данные о том куда переносить задачу
    let moveToBacklog: boolean; // переносить ли в бэклог
    let moveToIteration: {  // информация о переносе в раздел итерации
      iterationId: string;
      storage: IterationTasksType;
    } | null;
    // если пользователь выбрал перенос в раздел итерации
    if (iterId && iterStorage) {
      moveToBacklog = false;
      moveToIteration = {
        iterationId: iterId,
        storage: iterStorage
      }
    } else {
      // если пользователь выбрал перенос в бэклог
      moveToBacklog = true;
      moveToIteration = null;
    }

    let moveFromBacklog: boolean; // переносить ли из бэклога
    let moveFromIteration: { // информация о переносе из раздела итерации
      iterationId: string;
      storage: IterationTasksType;
    } | null;
    // если переместить нужно из раздела итерации
    if (this.iterationId && this.iterationStorage) {
      moveFromBacklog = false;
      moveFromIteration = {
        iterationId: this.iterationId,
        storage: this.iterationStorage
      }
    } else {
      moveFromBacklog = true;
      moveFromIteration = null;
    }
    
    // окончательно сформированные данные для запроса о переносе задачи
    const moveData: IMoveTaskRequest = {
      moveFromBacklog,
      moveFromIteration,
      moveToBacklog,
      moveToIteration
    };

    this.store.dispatch(moveTaskStart({
      moveData: moveData,
      task: this.task
    }))
  }
}