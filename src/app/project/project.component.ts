import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { fetchProjectStart } from '../store/actions/project.actions';
import { AppState } from '../store/reducers';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  private projectId: string;

  constructor(
    private store: AppState,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.projectId = params['projectId'];
        if (typeof this.projectId == 'string') {
          this.store.dispatch(fetchProjectStart({ projectId: this.projectId }))
        };
      }
    )
  }

}
