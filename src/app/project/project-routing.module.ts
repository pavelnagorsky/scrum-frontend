import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { IterationComponent } from "../iteration/iteration.component";
import { AuthGuard } from "../services/guards/auth-guard";
import { ProjectBacklogComponent } from "./project-backlog/project-backlog.component";
import { ProjectStartComponent } from "./project-start/project-start.component";
import { ProjectComponent } from "./project.component";

const projectRoutes: Routes = [
  { path: 'project', canActivate: [AuthGuard], children: [
    { path: ':projectId', component: ProjectComponent, children: [
      { path: '', component: ProjectStartComponent },
      { path: 'backlog', component: ProjectBacklogComponent },
      { path: 'iterations/:iterationId', component: IterationComponent }
    ] },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(projectRoutes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }