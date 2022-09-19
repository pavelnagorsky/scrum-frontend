import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { fetchProjectsStart } from '../store/actions/projects-list.actions';
import { AppState } from '../store/reducers';
import { ShortenProject } from '../store/reducers/projects-list.reducer';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;
  projects: ShortenProject[] = [];
  loading = false;

  constructor(
    private store: AppState
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.select(state => state.projectsList).subscribe(
      ({ projects, projectsLoading }) => {
        this.projects = projects;
        this.loading = projectsLoading;
      }
    );
  };

  onReloadProjects() {
    this.store.dispatch(fetchProjectsStart());
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe()
  }

}