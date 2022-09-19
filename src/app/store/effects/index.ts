import { AdminEffects } from "./admin.effects";
import { AuthEffects } from "./auth.effects";
import { IterationEffects } from "./iteration.effects";
import { ProjectEffects } from "./project.effects";
import { ProjectsListEffects } from "./projects-list.effects";
import { TaskEffects } from "./task.effects";

export const rootEffects = [
  AdminEffects,
  AuthEffects,
  IterationEffects,
  ProjectEffects,
  ProjectsListEffects,
  TaskEffects
]