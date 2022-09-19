import { Component, OnDestroy, OnInit } from '@angular/core';
import { select } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';

import { IProjectCommonData } from 'src/app/models/project.model';
import { acceptUserStart, rejectUserStart } from 'src/app/store/actions/admin.actions';
import { closeProjectEdit, openProjectEdit } from 'src/app/store/actions/project-edit.actions';
import { deleteProjectStart, leaveProjectStart } from 'src/app/store/actions/project.actions';
import { AppState } from 'src/app/store/reducers';
import { getProjectShorten, userIsAdmin } from 'src/app/store/selectors/project.selectors';

@Component({
  selector: 'app-project-start',
  templateUrl: './project-start.component.html',
  styleUrls: ['./project-start.component.scss']
})
export class ProjectStartComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;
  updateMode = false; // открта ли форма обновления проекта
  isAdmin = false;
  private userId: string | null;
  projectData: IProjectCommonData | null;

  constructor(
    private store: AppState
  ) { }

  onAcceptUser(userId: string) {
    if (!this.isAdmin || !this.projectData) return;
    this.store.dispatch(acceptUserStart({
      userId: userId,
      projectId: this.projectData._id
    }))
  }

  onRejectUser(userId: string) {
    if (!this.isAdmin || !this.projectData) return;
    this.store.dispatch(rejectUserStart({
      userId: userId,
      projectId: this.projectData._id
    }))
  }

  onLeaveProject() {
    if (this.isAdmin || !this.projectData || !this.userId) return;
    this.store.dispatch(leaveProjectStart({
      projectId: this.projectData._id,
      userId: this.userId
    }))
  }

  onToggleUpdateMode() {
    if (this.updateMode) {
      this.store.dispatch(closeProjectEdit())
    } else {
      if (!this.projectData) return;
      this.store.dispatch(openProjectEdit({
        project: {
          _id: this.projectData._id,
          title: this.projectData.title,
          description: this.projectData.description
        }
      }))
    }
  }

  onDeleteProject() {
    if (this.projectData && this.isAdmin) {
      this.store.dispatch(deleteProjectStart({
        projectId: this.projectData._id
      }))
    }
  }

  ngOnInit(): void {
    this.storeSub = this.store.pipe(
      select(state => state.auth.userId),
      switchMap(userId => {
        this.userId = userId;
        return this.store.select(getProjectShorten)
      }),
      switchMap(prjData => {
        this.projectData = prjData;
        return this.store.select(userIsAdmin)
      }),
      switchMap(admin => {
        this.isAdmin = admin;
        return this.store.select(state => state.editProject.open)
      })
    ).subscribe(isOpen => {
        this.updateMode = isOpen
      }
    )
  }

  ngOnDestroy(): void {
    this.store.dispatch(closeProjectEdit())
    this.storeSub.unsubscribe()
  }  
}
