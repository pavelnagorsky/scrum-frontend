import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';

import { fadeInOut } from 'src/app/shared/utils/animations';
import { closeProjectEdit } from 'src/app/store/actions/project-edit.actions';
import { createProjectStart, updateProjectStart } from 'src/app/store/actions/project.actions';
import { AppState } from 'src/app/store/reducers';
import { IEditProject } from 'src/app/store/reducers/project-edit.reducer';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
  animations: fadeInOut
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  projectForm: FormGroup;
  private projectEdit: IEditProject | null;
  loading = false;
  editMode = false;
  private storeSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: AppState
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.pipe(
      select(state => state.projectsList.projectsLoading),
      switchMap(loading => {
        this.loading = loading;
        return this.store.select(state => state.editProject.project)
      })
    )
    .subscribe(project => {
      this.projectEdit = project;
      if (this.projectEdit) {
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    });
    this.initForm();
  }

  onSubmit() {
    if (this.projectForm.invalid) return;
    const title: string = this.projectForm.value['title'];
    const description: string = this.projectForm.value['description'];
    if (this.editMode && this.projectEdit) {
      this.store.dispatch(updateProjectStart({
        project: {
          _id: this.projectEdit._id,
          title: title,
          description: description
        }
      }));
    } else {
      this.store.dispatch(createProjectStart({
        title: title,
        description: description
      }));
    }
    // закрываем форму
    setTimeout(() => this.onCancel(), 1000)
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe()
  }

  private initForm() {
    let title = '';
    let description = '';
    if (this.projectEdit) {
      title = this.projectEdit.title;
      description = this.projectEdit.description;
    }
    this.projectForm = this.fb.group({
      'title': [title, [
        Validators.required,
        Validators.minLength(3),
        // no whitespace in the begin or end
        Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)
      ]],
      'description': [description, [
        Validators.required,
        Validators.minLength(3),
        // no whitespace in the begin or end
        Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)
      ]]
    })
  }

  // для правильного отображения bootsrap классов is-valid, is-invalid
  isValid(field: string): string {
    if (this.projectForm.get(field)) {
      return (
        !this.projectForm.get(field)?.valid && this.projectForm.get(field)?.touched) 
          ? 'is-invalid' 
          : this.projectForm.get(field)?.touched 
            ? 'is-valid' 
            : '';
    } else {
      return ""
    }
  }

  onCancel() {
    this.projectForm.reset();
    this.store.dispatch(closeProjectEdit());
  }

  showControlMessage(field: string): boolean {
    let control = this.projectForm.get(field);
    if (!control) return false;
    if (control.invalid && control.touched) {
      return true
    } else {
      return false
    }
  }
}
