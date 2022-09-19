import { Component, OnInit } from '@angular/core';
import { select } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';

import { logout } from '../store/actions/auth.actions';
import { AppState } from '../store/reducers';
import { ShortenProject } from '../store/reducers/projects-list.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  projects: ShortenProject[] = [];
  isAuth = false;
  currentProjectId: string;
  private storeSub: Subscription;

  constructor(
    private store: AppState
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.pipe(
      select(
        state => state.auth.userId !== null
      ),
      switchMap(isAuth => {
        this.isAuth = isAuth;
        return this.store.select(state => state.projectsList.projects)
      })
    ).subscribe(
      projects => {
        this.projects = projects;
      }
    )
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

}
