import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';

import { fadeInOut } from 'src/app/shared/utils/animations';
import { closeIterationEdit } from 'src/app/store/actions/iteration-edit.actions';
import { createIterationStart, updateIterationStart } from 'src/app/store/actions/iteration.actions';
import { AppState } from 'src/app/store/reducers';
import { IEditedIteration } from 'src/app/store/reducers/iteration-edit.reducer';

@Component({
  selector: 'app-iteration-edit',
  templateUrl: './iteration-edit.component.html',
  styleUrls: ['./iteration-edit.component.scss'],
  animations: fadeInOut
})
export class IterationEditComponent implements OnInit, OnDestroy {
  iterationForm: FormGroup;
  private projectId: string;
  private iterationEdit: IEditedIteration | null;
  loading = false;
  editMode = false;
  private storeSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: AppState
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
    this.storeSub = this.store.pipe(
      select(state => state.project.loading),
      switchMap(loading => {
        this.loading = loading;
        return this.store.select(state => state.editIteration.iteration)
      })
    )
    .subscribe(iteration => {
      this.iterationEdit = iteration;
      if (this.iterationEdit) {
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    });
    this.initForm();
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe()
  }

  onSubmit() {
    if (this.iterationForm.invalid) return;
    const title: string = this.iterationForm.value['title'];
    const deadline: string = this.iterationForm.value['deadline'];
    if (this.editMode && this.iterationEdit) {
      this.store.dispatch(updateIterationStart({
        iterationId: this.iterationEdit._id,
        title,
        deadline,
        projectId: this.projectId
      }));
    } else {
      this.store.dispatch(createIterationStart({
        title,
        deadline,
        projectId: this.projectId
      }));
    }
    // закрываем форму
    setTimeout(() => this.onCancel(), 1000)
  }

  private initForm() {
    let title = '';
    let deadline = null;
    if (this.iterationEdit) {
      title = this.iterationEdit.title;
      // получаем формат hhhh-mm-dd
      deadline = this.iterationEdit.deadline.slice(0, 10);
    }
    this.iterationForm = this.fb.group({
      'title': [title, [
        Validators.required,
        Validators.minLength(3),
        // no whitespace in the begin or end
        Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)
      ]],
      'deadline': [deadline, [
        Validators.required
      ]]
    })
  }

  // для правильного отображения bootsrap классов is-valid, is-invalid
  isValid(field: string): string {
    if (this.iterationForm.get(field)) {
      return (
        !this.iterationForm.get(field)?.valid && this.iterationForm.get(field)?.touched) 
          ? 'is-invalid' 
          : this.iterationForm.get(field)?.touched 
            ? 'is-valid' 
            : '';
    } else {
      return ""
    }
  }

  onCancel() {
    this.iterationForm.reset();
    this.store.dispatch(closeIterationEdit());
  }

  showControlMessage(field: string): boolean {
    let control = this.iterationForm.get(field);
    if (!control) return false;
    if (control.invalid && control.touched) {
      return true
    } else {
      return false
    }
  }

}
