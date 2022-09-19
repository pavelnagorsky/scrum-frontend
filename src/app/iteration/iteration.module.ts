import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { TaskModule } from "../task/task.module";
import { IterationEditComponent } from "./iteration-edit/iteration-edit.component";
import { IterationComponent } from "./iteration.component";

@NgModule({
  declarations: [
    IterationComponent,
    IterationEditComponent
  ],
  imports: [
    SharedModule,
    TaskModule
  ], 
  exports: [
    IterationEditComponent
  ]
})
export class IterationModule { }