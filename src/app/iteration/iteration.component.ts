import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

import { Iteration } from '../models/iteration.model';
import { openIterationEdit } from '../store/actions/iteration-edit.actions';
import { deleteIterationStart } from '../store/actions/iteration.actions';
import { AppState } from '../store/reducers';
import { getProject, userIsAdmin } from '../store/selectors/project.selectors';
import * as TaskEditActions from '../store/actions/task-edit.actions';

@Component({
  selector: 'app-iteration',
  templateUrl: './iteration.component.html',
  styleUrls: ['./iteration.component.scss']
})
export class IterationComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;
  iterationId: string;
  private projectId?: string;
  iteration?: Iteration;
  isAdmin = false; // является ли пользователь админом проекта
  deleteMode = false;
  deleteForm: FormGroup;
  taskFormOpen = false; // открыта ли форма создания задачи

  constructor(
    private store: AppState,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  isDeadlinePast (): boolean {
    if (!this.iteration) return false;
    return new Date() >= new Date(this.iteration.deadline)
  }

  // открыть или закрыть форму создания новой задачи
  toggleTaskForm() {
    if (this.taskFormOpen) {
      this.store.dispatch(TaskEditActions.closeTaskEdit())
    } else {
      this.store.dispatch(TaskEditActions.openTaskEdit({
        task: null
      }))
    }
  }

  onToggleDeleteMode() {
    this.deleteMode = !this.deleteMode
    if (this.deleteMode) {
      this.initDeleteForm()
    }
  }

  onDeleteIteration() {
    if (this.deleteForm.invalid || !this.projectId) return;
    const deleteTasks: boolean = this.deleteForm.value['deleteTasks'];
    this.store.dispatch(deleteIterationStart({
      projectId: this.projectId,
      iterationId: this.iterationId,
      deleteTasks: deleteTasks
    }));
    this.deleteMode = false;
    this.router.navigate(['project', this.projectId ])
  }

  onUpdateIteration() {
    if (!this.iteration) return;
    this.store.dispatch(openIterationEdit({
      iteration: {
        title: this.iteration.title,
        deadline: this.iteration.deadline,
        _id: this.iteration._id
      }
    }))
  }

  private initDeleteForm() {
    this.deleteForm = this.fb.group({
      'deleteTasks': this.fb.control(false, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.storeSub = this.route.params.pipe(
      switchMap(params => {
        this.iterationId = params['iterationId'];
        return this.store.select(getProject)
      }), 
      switchMap(project => {
        this.projectId = project?._id;
        this.iteration = project?.iterations.find(iter => {
          return iter._id === this.iterationId
        });
        return this.store.select(state => state.editTask.open)
      }),
      switchMap(isOpen => {
        this.taskFormOpen = isOpen;
        return this.store.select(userIsAdmin)
      })
    )
    .subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(TaskEditActions.closeTaskEdit());
    this.storeSub.unsubscribe()
  }
}