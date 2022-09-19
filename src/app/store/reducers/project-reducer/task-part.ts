import { updateObject } from "src/app/shared/utils/update-object"
import { ProjectReduceFunction } from "./project.reducer"
import * as TaskActions from '../../actions/task.actions';
import { projectFactory } from "src/app/models/project.model";
import { taskFactory } from "src/app/models/task.model";

// task reduce functions

export const createTaskStartReduce: ProjectReduceFunction<typeof TaskActions.createTaskStart> =
(state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  })
}

// успешное создание новой задачи в бэклоге или итерации
export const createTaskSuccessReduce: ProjectReduceFunction<typeof TaskActions.createTaskSuccess> =
(state, action) => {
  if (!state.project) return state;
  const task = taskFactory(action.task);
  const iterationId = action.iterationId;
  const project = projectFactory(state.project);
  // создание задачи в итерации
  if (iterationId) {
    const iterId = project.iterations.findIndex(iter => {
      return iter._id === iterationId
    });
    if (iterId === -1) return state;
    project.iterations[iterId].tasks.TODO.push(task);
  } else {
    // создание задачи в бэклоге
    project.backlog.push(task);
  }
  return updateObject(state, {
    project: project,
    loading: false
  })
}

export const createTaskFailReduce: ProjectReduceFunction<typeof TaskActions.createTaskFail> =
(state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  })
}

export const updateTaskStartReduce: ProjectReduceFunction<typeof TaskActions.updateTaskStart> =
(state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  })
}

// успешное обновление задачи в бэклоге или итерации
export const updateTaskSuccessReduce: ProjectReduceFunction<typeof TaskActions.updateTaskSuccess> =
(state, action) => {
  if (!state.project) return state;
  const task = taskFactory(action.task);
  const iterationId = action.iterationId;
  const iterationStotage = action.iterationStorage;
  const project = projectFactory(state.project);
  // если задача находится в итерации
  if (iterationId && iterationStotage) {
    // находим нужную итерацию
    const iterId = project.iterations.findIndex(iter => {
      return iter._id === iterationId
    });
    if (iterId === -1) return state;
    // находим нужную задачу
    const taskId = project.iterations[iterId].tasks[iterationStotage].findIndex(t => {
      return t._id === task._id
    });
    if (taskId === -1) return state;
    // обновляем задачу
    project.iterations[iterId].tasks[iterationStotage][taskId] = task;
  } else { // обновление задачи в бэклоге
    // находим задачу в бэклоге
    const taskId = project.backlog.findIndex(t => {
      return t._id === task._id
    });
    if (taskId === -1) return state;
    // обновляем задачу
    project.backlog[taskId] = task;
  }
  return updateObject(state, {
    project: project,
    loading: false
  })
}

export const updateTaskFailReduce: ProjectReduceFunction<typeof TaskActions.updateTaskFail> =
(state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  })
}

export const deleteTaskStartReduce: ProjectReduceFunction<typeof TaskActions.deleteTaskStart> =
(state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  })
}

// успешное удаление задачи из итерации или бэклога
export const deleteTaskSuccessReduce: ProjectReduceFunction<typeof TaskActions.deleteTaskSuccess> =
(state, action) => {
  if (!state.project) return state;
  const project = projectFactory(state.project);
  // если необходимо удалить задачу из итерации
  if (action.iterationId && action.iterationStorage) {
    // находим нужную итерацию
    const iterIndex = project.iterations.findIndex(iter => {
      return iter._id === action.iterationId
    });
    if (iterIndex === -1) return state;
    // фильтруем нужный раздел итерации
    project.iterations[iterIndex].tasks[action.iterationStorage] = 
      project.iterations[iterIndex].tasks[action.iterationStorage].filter(t => {
        return t._id !== action._id
      });
  } else { // если необходимо удалить задачу из бэклога
    // фильтруем бэклог
    project.backlog = project.backlog.filter(t => {
      return t._id !== action._id
    })
  }
  return updateObject(state, {
    project: project,
    loading: false
  })
}

export const deleteTaskFailReduce: ProjectReduceFunction<typeof TaskActions.deleteTaskFail> =
(state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  })
}

export const moveTaskStartReduce: ProjectReduceFunction<typeof TaskActions.moveTaskStart> =
(state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  })
}

// успешное перемещение задачи в рамках проекта
export const moveTaskSuccessReduce: ProjectReduceFunction<typeof TaskActions.moveTaskSuccess> =
(state, action) => {
  if (!state.project) return state;
  const project = projectFactory(state.project);

  // процесс удаления задачи из предыдущего места нахождения

  // если задачу необходимо переместить из бэклога
  if (action.moveData.moveFromBacklog) {
    // убираем задачу из бэклога
    project.backlog = project.backlog.filter(t => {
      return t._id !== action.task._id
    });
  } else {
    // если задачу необходимо переместить из раздела итерации
    const iterationId = action.moveData.moveFromIteration?.iterationId;
    const iterationStorage = action.moveData.moveFromIteration?.storage;
    if (!iterationId || !iterationStorage) return state;
    // находим индекс нужной итерации
    const iterIndex = project.iterations.findIndex(iter => {
      return iter._id === iterationId
    });
    if (iterIndex === -1) return state;
    // убираем задачу из раздела итерации
    project.iterations[iterIndex].tasks[iterationStorage] =
      project.iterations[iterIndex].tasks[iterationStorage].filter(t => {
        return t._id !== action.task._id
      })
  }

  // процесс создания задачи в новом местонахождении

  // если задачу требуется поместить в бэклог
  if (action.moveData.moveToBacklog) {
    // создание задачи в бэклоге
    project.backlog.push(action.task);
  } else {
    // если задачу требуется поместить в раздел итерации
    const iterationId = action.moveData.moveToIteration?.iterationId;
    const iterationStorage = action.moveData.moveToIteration?.storage;
    if (!iterationId || !iterationStorage) return state;
    // находим индекс нужной итерации
    const iterIndex = project.iterations.findIndex(iter => {
      return iter._id === iterationId
    });
    if (iterIndex === -1) return state;
    // добавляем задачу в раздел итерации
    project.iterations[iterIndex].tasks[iterationStorage].push(action.task);
  }

  return updateObject(state, {
    project: project,
    loading: false
  })
}

export const moveTaskFailReduce: ProjectReduceFunction<typeof TaskActions.moveTaskFail> =
(state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  })
}