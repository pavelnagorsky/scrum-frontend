import { NgModule } from "@angular/core";
import { IterationModule } from "../iteration/iteration.module";
import { SharedModule } from "../shared/shared.module";

import { TaskModule } from "../task/task.module";
import { ProjectBacklogComponent } from "./project-backlog/project-backlog.component";
import { ProjectEditComponent } from "./project-edit/project-edit.component";
import { ProjectNavigationComponent } from "./project-navigation/project-navigation.component";
import { ProjectRoutingModule } from "./project-routing.module";
import { ProjectStartComponent } from "./project-start/project-start.component";
import { ProjectComponent } from "./project.component";

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectStartComponent,
    ProjectEditComponent,
    ProjectNavigationComponent,
    ProjectBacklogComponent
  ],
  imports: [
    SharedModule,
    TaskModule,
    IterationModule,
    ProjectRoutingModule
  ],
  exports: [
    ProjectEditComponent
  ]
})
export class ProjectModule { }