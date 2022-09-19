import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, exhaustMap, map, of } from "rxjs"

import { 
  ICreateTask, 
  IDeleteTask, 
  IMoveTaskRequest, 
  ITask, 
  IUpdateTask, 
  taskFactory 
} from "src/app/models/task.model";
import * as TaskActions from '../actions/task.actions';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  // запрос на создание задачи в бэклоге или итерации
  performCreateTask = createEffect(() => this.actions$
    .pipe(
      ofType(TaskActions.createTaskStart),
      exhaustMap( ({ task }) => this.handleCreateTask(task) )
    )
  )

  // запрос на обновление задания в бэклоге или итерации
  performUpdateTask = createEffect(() => this.actions$
    .pipe(
      ofType(TaskActions.updateTaskStart),
      exhaustMap( ({ task }) => this.handleUpdateTask(task) )
    )
  )

  // запрос на удаление задачи из бэклога или итерации
  performDeleteTask = createEffect(() => this.actions$
    .pipe(
      ofType(TaskActions.deleteTaskStart),
      exhaustMap( taskInfo => this.handleDeleteTask(taskInfo) )
    )
  )

  // запрос на перемещение задачи в рамках проекта
  performMoveTask = createEffect(() => this.actions$
    .pipe(
      ofType(TaskActions.moveTaskStart),
      exhaustMap( ({ moveData, task }) => this.handleMoveTask(moveData, task) )
    )
  )

  private handleCreateTask(taskInfo: ICreateTask) {
    return this.http.put<{ task: ITask }>(
      `projects/${taskInfo.projectId}/tasks`,
      {
        title: taskInfo.title,
        description: taskInfo.description,
        storyPoints: taskInfo.storyPoints,
        iterationId: taskInfo.iterationId
      }
    ).pipe(
      map(response => {
        const task = taskFactory(response.task);
        return TaskActions.createTaskSuccess({ 
          task: task,
          iterationId: taskInfo.iterationId 
        })
      }),
      catchError((error: HttpErrorResponse) => {
        return of(TaskActions.createTaskFail())
      })
    )
  }

  private handleUpdateTask(taskInfo: IUpdateTask) {
    return this.http.patch<{ task: ITask }>(
      `projects/${taskInfo.projectId}/tasks/${taskInfo._id}`,
      {
        title: taskInfo.title,
        description: taskInfo.description,
        storyPoints: taskInfo.storyPoints
      }
    ).pipe(
      map(response => {
        const task = taskFactory(response.task);
        return TaskActions.updateTaskSuccess({ 
          task: task,
          iterationId: taskInfo.iterationId,
          iterationStorage: taskInfo.iterationStorage
        })
      }),
      catchError((error: HttpErrorResponse) => {
        return of(TaskActions.updateTaskFail())
      })
    )
  }

  private handleDeleteTask(taskInfo: IDeleteTask) {
    return this.http.delete<{ taskId: string }>(
      `projects/${taskInfo.projectId}/tasks/${taskInfo._id}`
    ).pipe(
      map(({ taskId }) => {
        return TaskActions.deleteTaskSuccess({
          _id: taskId,
          iterationId: taskInfo.iterationId,
          iterationStorage: taskInfo.iterationStorage,
          projectId: taskInfo.projectId
        })
      }),
      catchError((error: HttpErrorResponse) => {
        return of(TaskActions.deleteTaskFail())
      })
    )
  }

  private handleMoveTask(moveData: IMoveTaskRequest, task: ITask) {
    return this.http.post(
      `projects/${task.projectId}/tasks/${task._id}/storage`,
      {
        storageData: moveData
      }
    ).pipe(
      map(() => {
        return TaskActions.moveTaskSuccess({
          task: task,
          moveData: moveData
        })
      }),
      catchError((error: HttpErrorResponse) => {
        return of(TaskActions.moveTaskFail())
      })
    )
  }
}