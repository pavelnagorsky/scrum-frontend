import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { TaskEditComponent } from "./task-edit/task-edit.component";
import { TaskMoveComponent } from "./task-move/task-move.component";
import { TaskComponent } from "./task.component";

@NgModule({
  declarations: [
    TaskComponent,
    TaskEditComponent,
    TaskMoveComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    TaskComponent,
    TaskEditComponent,
    TaskMoveComponent
  ]
})
export class TaskModule { }