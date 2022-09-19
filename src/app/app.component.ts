import { Component, OnInit } from '@angular/core';

import { autoLogin } from './store/actions/auth.actions';
import { AppState } from './store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private store: AppState
  ) {}

  ngOnInit(): void {
    this.store.dispatch(autoLogin())
  }
}
