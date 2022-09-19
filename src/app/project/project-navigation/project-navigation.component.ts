import { Component, OnDestroy, OnInit } from '@angular/core';
import { select } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';

import { ShortenIteration } from 'src/app/models/iteration.model';
import { closeIterationEdit, openIterationEdit } from 'src/app/store/actions/iteration-edit.actions';
import { AppState } from 'src/app/store/reducers';
import { getShortenIterations, userIsAdmin } from 'src/app/store/selectors/project.selectors';

@Component({
  selector: 'app-project-navigation',
  templateUrl: './project-navigation.component.html',
  styleUrls: ['./project-navigation.component.scss']
})
export class ProjectNavigationComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;
  isAdmin = false; // является ли пользователь админом проекта
  loading = false;
  iterations: ShortenIteration[];
  // открыта ли форма создания/редактирования итерации
  iterationFormOpen = false;

  constructor(
    private store: AppState
  ) { }

  // развернуть или свернуть форму для новой итерации
  onToggleForm() {
    if (this.iterationFormOpen) {
      this.store.dispatch(closeIterationEdit())
    } else {
      this.store.dispatch(openIterationEdit({ iteration: null }))
    }
  }

  ngOnInit(): void {
    this.storeSub = this.store.pipe(
      select(state => state.project.loading),
      switchMap(isLoading => {
        this.loading = isLoading;
        return this.store.select(userIsAdmin)
      }),
      switchMap(isAdmin => {
        this.isAdmin = isAdmin;
        return this.store.select(getShortenIterations)
      }),
      switchMap(iterations => {
        this.iterations = iterations;
        return this.store.select(state => state.editIteration.open)
      })
    )
    .subscribe(iterFormOpen => {
      this.iterationFormOpen = iterFormOpen;
    })
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
    this.store.dispatch(closeIterationEdit());
  }
}