import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";

import { IProject, Project, projectFactory } from "src/app/models/project.model";
import * as ProjectActions from '../actions/project.actions';
import { IEditProject } from "../reducers/project-edit.reducer";

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  // запрос на получение проекта
  performfetchProject = createEffect(() => this.actions$
    .pipe(
      ofType(ProjectActions.fetchProjectStart),
      exhaustMap( ({ projectId }) => this.handleFetchProject(projectId) )
    )
  )

  // запрос на создание
  performCreateProject = createEffect(() => this.actions$
    .pipe(
      ofType(ProjectActions.createProjectStart),
      exhaustMap( ({ title, description }) => this.handleCreateProject(title, description) )
    )
  )

  // запрос на обновление проекта
  performUpdateProject = createEffect(() => this.actions$
    .pipe(
      ofType(ProjectActions.updateProjectStart),
      exhaustMap( ({ project }) => this.handleUpdateProject(project) )
    )
  )

  // запрос на удаление проекта
  performDeleteProject = createEffect(() => this.actions$
    .pipe(
      ofType(ProjectActions.deleteProjectStart),
      exhaustMap( ({ projectId }) => this.handleDeleteProject(projectId) )
    )
  )

  // запрос на покидание проекта
  performLeaveProject = createEffect(() => this.actions$
    .pipe(
      ofType(ProjectActions.leaveProjectStart),
      exhaustMap( ({ projectId, userId }) => this.handleLeaveProject(projectId, userId) )
    )
  )

  // редирект на созданный проект
  redirectToNewProject = createEffect(() => this.actions$
    .pipe(
      ofType(ProjectActions.createProjectSuccess),
      tap( ({ project }) => {
        return this.router.navigate(['project', project._id])
      })
    ), {
      dispatch: false
    }
  )

  // редирект на главную страницу с проектами при успешном удалении конкретного
  redirectFromDeletedProject = createEffect(() => this.actions$
    .pipe(
      ofType(ProjectActions.deleteProjectSuccess),
      tap(() => {
        return this.router.navigate(['projects'])
      })
    ), {
      dispatch: false
    }
  )

  // редирект на главную страницу с проектами при успешном покидании пользователем конкретного
  redirectFromLeaveProject = createEffect(() => this.actions$
    .pipe(
      ofType(ProjectActions.leaveProjectSuccess),
      tap(() => {
        return this.router.navigate(['projects'])
      })
    ), {
      dispatch: false
    }
  )

  private handleFetchProject(projectId: string) {
    return this.http.get<{ project: Project }>(
      `projects/${projectId}`
    ).pipe(
      map(response => {
        const project = projectFactory(response.project);
        return ProjectActions.fetchProjectSuccess({ project: project })
      }),
      catchError((error: HttpErrorResponse) => {
        return of(ProjectActions.fetchProjectFail())
      })
    )
  }

  private handleCreateProject(title: string, description: string) {
    return this.http.put<{ project: IProject }>(
      'projects',
      {
        title: title,
        description: description
      }
    ).pipe(
      map(response => {
        const project = projectFactory(response.project);
        return ProjectActions.createProjectSuccess({ project: project })
      }),
      catchError((error: HttpErrorResponse) => {
        return of(ProjectActions.createProjectFail())
      })
    )
  }

  private handleUpdateProject(project: IEditProject) {
    return this.http.patch<{ project: IEditProject }>(
      `projects/${project._id}`,
      {
        title: project.title,
        description: project.description
      }
    ).pipe(
      map(response => {
        return ProjectActions.updateProjectSuccess({ project: response.project })
      }),
      catchError((error: HttpErrorResponse) => {
        return of(ProjectActions.updateProjectFail())
      })
    )
  }

  private handleDeleteProject(projectId: string) {
    return this.http.delete<{ projectId: string }>(
      `projects/${projectId}`
    ).pipe(
      map(response => {
        return ProjectActions.deleteProjectSuccess({ projectId: response.projectId })
      }),
      catchError((error: HttpErrorResponse) => {
        return of(ProjectActions.deleteProjectFail())
      })
    )
  }

  private handleLeaveProject(projectId: string, userId: string) {
    return this.http.post<{ userId: string, projectId: string }>(
      `projects/${projectId}/leave`,
      {}
    ).pipe(
      map(response => {
        return ProjectActions.leaveProjectSuccess({
          userId: response.userId,
          projectId: response.projectId
        })
      }),
      catchError((error: HttpErrorResponse) => {
        return of(ProjectActions.leaveProjectFail())
      })
    )
  }
}