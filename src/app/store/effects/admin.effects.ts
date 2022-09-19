import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";

import * as AdminActions from '../actions/admin.actions';

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}

  // приянть пользователя в проект
  performAcceptUser = createEffect(() => this.actions$
    .pipe(
      ofType(AdminActions.acceptUserStart),
      exhaustMap( ({ userId, projectId }) => this.handleAcceptUser(userId, projectId) )
    )
  )

  // отклонить вступление пользователя в проект
  performRejectUser = createEffect(() => this.actions$
    .pipe(
      ofType(AdminActions.rejectUserStart),
      exhaustMap( ({ userId, projectId }) => this.handleRejectUser(userId, projectId) )
    )
  )

  private handleAcceptUser(userId: string, projectId: string) {
    return this.http.post<{ userId: string, username: string }>(
      `projects/${projectId}/acceptUser/${userId}`,
      {}
    ).pipe(
      map(response => {
        return AdminActions.acceptUserSuccess({ 
          userId: response.userId,
          username: response.username
        })
      }),
      catchError((error: HttpErrorResponse) => {
        return of(AdminActions.acceptUserFail())
      })
    )
  }

  private handleRejectUser(userId: string, projectId: string) {
    return this.http.post<{ userId: string }>(
      `projects/${projectId}/rejectUser/${userId}`,
      {}
    ).pipe(
      map(({ userId }) => {
        return AdminActions.rejectUserSuccess({ 
          userId: userId
        })
      }),
      catchError((error: HttpErrorResponse) => {
        return of(AdminActions.rejectUserFail())
      })
    )
  }
}