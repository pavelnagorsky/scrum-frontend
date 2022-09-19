import { Component, OnDestroy, OnInit } from '@angular/core';
import { select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { clearError } from 'src/app/store/actions/project.actions';
import { AppState } from 'src/app/store/reducers';
import { getError } from 'src/app/store/selectors/project.selectors';
import { modalAnimation } from '../utils/animations';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
  animations: modalAnimation
})
export class ErrorModalComponent implements OnInit, OnDestroy {
  private storeSub: Subscription
  error = false

  constructor(
    private store: AppState
  ) { }

  onClearError() {
    this.store.dispatch(clearError())
  }

  ngOnInit(): void {
    this.storeSub = this.store.pipe(
      select(getError)
    ).subscribe(
      err => {
        this.error = err
      }
    )
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe()
  }

}
