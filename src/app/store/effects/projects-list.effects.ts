import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";

import * as ProjectsListActions from '../actions/projects-list.actions';
import { AppState } from "../reducers";
import { ShortenProject } from "../reducers/projects-list.reducer";

@Injectable()
export class ProjectsListEffects {
  constructor(
    private actions$: Actions,
    private store: AppState,
    private http: HttpClient
  ) {}

  // запрос на вступление в проект
  performJoinProject = createEffect(() => this.actions$
    .pipe(
      ofType(ProjectsListActions.joinProjectStart),
      exhaustMap( ({ projectId }) => this.handleJoinProject(projectId) )
    )
  );

  // получение списка проектов с участием пользователя
  performFechProjects = createEffect(() => this.actions$
    .pipe(
      ofType(ProjectsListActions.fetchProjectsStart),
      switchMap(() => this.handleFetchProjects())
    )
  )

  private handleFetchProjects() {
    return this.http.get<{ projects: ShortenProject[] }>(
      'projects'
    ).pipe(
      map(response => {
        return ProjectsListActions.fetchProjectsSuccess({
          projects: response.projects
        })
      }),
      catchError((err: HttpErrorResponse) => {
        return of(ProjectsListActions.fetchProjectsFail())
      })
    )
  };

  private handleJoinProject(projectId: string) {
    return this.http.post<{
      message: string,
      userId: string
    }>(
      `projects/${projectId}/join`,
      {}
    ).pipe(
      map(response => {
        return ProjectsListActions.joinProjectSuccess();
      }),
      tap(() => this.hideJoinInfo()),
      catchError((err: HttpErrorResponse) => {
        return this.joinProjectErrorHandler(err).pipe(
          tap(() => this.hideJoinInfo())
        )
      })
    )
  }

  // по окончанию таймера убираем UI информацию об успешном вступление в очередь на проект
  private hideJoinInfo() {
    setTimeout(
      () => this.store.dispatch(
        ProjectsListActions.clearJoinProjectInfo()
      ), 
      10000
    )
  }

  private joinProjectErrorHandler(errorResponse: HttpErrorResponse) {
    let errorMessage = "Network error occured. Please, check your internet connection.";
    if (errorResponse.status === 500) {
      errorMessage = "Unknown server error. Please, check your internet connection."
    };
    if (errorResponse.error && errorResponse.error.message) {
      switch(errorResponse.error.message) {
        case 'No project found': 
          errorMessage = "No project with entered Id found, ask project's admin to send you a correct one.";
          break;
        case 'User is already in queue': 
          errorMessage = "You are already in queue for entering this project. Please, wait until project's admin accepts you.";
          break;
        case 'User is already in project': 
          errorMessage = "You are already a member of this project, no chance to join it again :)";
          break;
      };
    };
    return of(ProjectsListActions.joinProjectFail({
      errorMessage: errorMessage
    }))
  }

}