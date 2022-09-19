import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProjectModule } from "../project/project.module";

import { AuthGuard } from "../services/guards/auth-guard";
import { SharedModule } from "../shared/shared.module";
import { ProjectsListComponent } from "./projects-list.component";
import { ProjectsSearchComponent } from "./projects-search/projects-search.component";

@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectsSearchComponent
  ],
  imports: [
    SharedModule,
    ProjectModule,
    RouterModule.forChild([
      { 
        path: 'projects',
        canActivate: [AuthGuard], 
        component: ProjectsListComponent
      }
    ])
  ]
})
export class ProjectsListModule {}