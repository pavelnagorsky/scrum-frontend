import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';

import { closeProjectEdit, openProjectEdit } from 'src/app/store/actions/project-edit.actions';
import { joinProjectStart } from 'src/app/store/actions/projects-list.actions';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-projects-search',
  templateUrl: './projects-search.component.html',
  styleUrls: ['./projects-search.component.scss']
})
export class ProjectsSearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  private storeSub: Subscription;
  loading = false;
  error: string | null = null;
  joinSuccess = false;
  // показывать ли форму создания нового проекта
  projectFormOpen = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: AppState
  ) { }

  // открыть или закрыть форму создания нового проекта
  onToggleProjectForm() {
    if (this.projectFormOpen) {
      this.store.dispatch(closeProjectEdit())
    } else {
      this.store.dispatch(openProjectEdit({ project: null }))
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.storeSub = this.store.pipe(
      select(state => state.editProject.open),
      switchMap((isOpen) => {
        this.projectFormOpen = isOpen;
        return this.store.select(state => state.projectsList)
      })
    )
    .subscribe(({ joinError, joinLoading, joinSuccess }) => {
      this.error = joinError;
      this.loading = joinLoading;
      this.joinSuccess = joinSuccess;
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(closeProjectEdit());
    this.storeSub.unsubscribe()
  }

  onSubmit() {
    const projectId: string | undefined = this.searchForm.value['projectId'];
    if (!projectId) return;
    this.store.dispatch(
      joinProjectStart({ projectId: projectId })
    );
    this.searchForm.reset();
  }

  private initForm() {
    this.searchForm = this.formBuilder.group({
      'projectId': ['', [
        Validators.required, 
        Validators.minLength(24), 
        Validators.maxLength(24),
        Validators.pattern(/^[a-zA-Z0-9_]*$/)
      ]]
    });
  }

  // для правильного отображения bootsrap классов is-valid, is-invalid
  isValid(field: string): string {
    if (this.searchForm.get(field)) {
      return (
        !this.searchForm.get(field)?.valid && this.searchForm.get(field)?.touched) 
          ? 'is-invalid' 
          : this.searchForm.get(field)?.touched 
            ? 'is-valid' 
            : '';
    } else {
      return ""
    }
  }
}
