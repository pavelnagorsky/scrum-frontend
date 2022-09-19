import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';

import { fadeInOut } from 'src/app/shared/utils/animations';
import { closeTaskEdit } from 'src/app/store/actions/task-edit.actions';
import { createTaskStart, updateTaskStart } from 'src/app/store/actions/task.actions';
import { AppState } from 'src/app/store/reducers';
import { ITaskEdit } from 'src/app/store/reducers/task-edit.reducer';
import { getProjectId } from 'src/app/store/selectors/project.selectors';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  animations: fadeInOut
})
export class TaskEditComponent implements OnInit, OnDestroy {
  @Input() iterationId?: string;
  taskForm: FormGroup;
  private projectId?: string;
  private taskEdit: ITaskEdit | null;
  loading = false;
  editMode = false;
  private storeSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: AppState
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.pipe(
      select(state => state.project.loading),
      switchMap(loading => {
        this.loading = loading;
        return this.store.select(getProjectId)
      }),
      switchMap(projectId => {
        this.projectId = projectId
        return this.store.select(state => state.editTask.task)
      })
    )
    .subscribe(task => {
      this.taskEdit = task;
      if (this.taskEdit) {
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
    if (this.taskForm.invalid || !this.projectId) return;
    const title: string = this.taskForm.value['title'];
    const description: string = this.taskForm.value['description'];
    const storyPoints: number = this.taskForm.value['storyPoints'];
    if (this.editMode && this.taskEdit) { 
      // обновление
      this.store.dispatch(updateTaskStart({
        task: {
          _id: this.taskEdit._id,
          projectId: this.projectId,
          title,
          description,
          storyPoints,
          iterationId: this.iterationId,
          iterationStorage: this.taskEdit.iterationStorage ?? undefined
        }
      }))
    } else { 
      // создание
      this.store.dispatch(createTaskStart({
        task: {
          title,
          description,
          storyPoints,
          projectId: this.projectId,
          iterationId: this.iterationId
        }
      }));
    }
    // закрываем форму
    setTimeout(() => this.onCancel(), 1000)
  }

  private initForm() {
    let title = '';
    let storyPoints = 0;
    let description = '';
    if (this.taskEdit) {
      title = this.taskEdit.title;
      storyPoints = this.taskEdit.storyPoints;
      description = this.taskEdit.description;
    }
    this.taskForm = this.fb.group({
      'title': [title, [
        Validators.required,
        // no whitespace in the begin or end
        Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)
      ]],
      'description': [description, [
        Validators.required,
        // no whitespace in the begin or end
        Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)
      ]],
      'storyPoints': [storyPoints, [
        Validators.required,
        Validators.pattern(/^[0-5]+$/), // 0-5
        Validators.min(0),
        Validators.max(5)
      ]]
    })
  }

  // для правильного отображения bootsrap классов is-valid, is-invalid
  isValid(field: string): string {
    if (this.taskForm.get(field)) {
      return (
        !this.taskForm.get(field)?.valid && this.taskForm.get(field)?.touched) 
          ? 'is-invalid' 
          : this.taskForm.get(field)?.touched 
            ? 'is-valid' 
            : '';
    } else {
      return ""
    }
  }

  onCancel() {
    this.taskForm.reset();
    this.store.dispatch(closeTaskEdit());
  }

  showControlMessage(field: string): boolean {
    let control = this.taskForm.get(field);
    if (!control) return false;
    if (control.invalid && control.touched) {
      return true
    } else {
      return false
    }
  }
}
