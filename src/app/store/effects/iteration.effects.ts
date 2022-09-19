import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";

import { IIteration, iterationFactory } from "src/app/models/iteration.model";
import { IProject, projectFactory } from "src/app/models/project.model";
import * as IterationActions from '../actions/iteration.actions';

@Injectable()
export class IterationEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  // запрос на создание новой итерации
  performCreateIteration = createEffect(() => this.actions$
    .pipe(
      ofType(IterationActions.createIterationStart),
      exhaustMap(
        ({ title, deadline, projectId }) => this.handleCreateIteration(title, deadline, projectId)
      )
    )
  );

  // запрос на обновление итерации
  performUpdateIteration = createEffect(() => this.actions$
    .pipe(
      ofType(IterationActions.updateIterationStart),
      exhaustMap(iterationData => this.handleUpdateIteration(
        iterationData.iterationId,
        iterationData.title,
        iterationData.deadline,
        iterationData.projectId
      ))
    )
  );

  performDeleteIteration = createEffect(() => this.actions$
    .pipe(
      ofType(IterationActions.deleteIterationStart),
      exhaustMap(({ projectId, iterationId, deleteTasks }) => {
        return this.handleDeleteIteration(projectId, iterationId, deleteTasks)
      })
    )
  );

  private handleCreateIteration(title: string, deadline: string, projectId: string) {
    return this.http.put<{ iteration: IIteration }>(
      `projects/${projectId}/iterations`,
      {
        title: title,
        deadline: deadline
      }
    ).pipe(
      map(response => {
        const iteration = iterationFactory(response.iteration);
        return IterationActions.createIterationSuccess({ iteration: iteration })
      }),
      catchError((error: HttpErrorResponse) => {
        return of(IterationActions.createIterationFail())
      })
    )
  }

  private handleUpdateIteration(
    iterationId: string, 
    title: string, 
    deadline: string, 
    projectId: string
  ) {
    return this.http.patch<{ iteration: IIteration }>(
      `projects/${projectId}/iterations/${iterationId}`,
      {
        title,
        deadline
      }
    ).pipe(
      map(response => {
        const iteration = iterationFactory(response.iteration);
        return IterationActions.updateIterationSuccess({ iteration: iteration })
      }),
      catchError((error: HttpErrorResponse) => {
        return of(IterationActions.updateIterationFail())
      })
    )
  }

  private handleDeleteIteration(
    projectId: string,
    iterationId: string, 
    deleteTasks: boolean
  ) {
    return this.http.delete<{ project: IProject }>(
      `projects/${projectId}/iterations/${iterationId}?deleteTasks=${deleteTasks}`,
    ).pipe(
      map(response => {
        const project = projectFactory(response.project);
        return IterationActions.deleteIterationSuccess({ project })
      }),
      catchError((error: HttpErrorResponse) => {
        return of(IterationActions.deleteIterationFail())
      })
    )
  }
}