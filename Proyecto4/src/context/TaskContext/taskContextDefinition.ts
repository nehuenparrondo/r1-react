/**
 * Guía de lectura. Define el contrato del contexto: qué datos y operaciones pueden
 * consumir las pantallas. Crear el contexto no carga datos; el valor real lo aporta
 * TaskProvider.
 */

import { createContext } from 'react'
import type { NewTask, QuickTask, Task, TaskStatus, TaskUpdates } from '../../types/Task'

// Contrato público del estado compartido y de todas sus operaciones.
export type TaskContextValue = {
  tasks: Task[]
  quickTasks: QuickTask[]
  addTask: (task: NewTask) => Task | null
  addQuickTask: (task: Task) => boolean
  removeQuickTask: (quickTaskId: string) => void
  updateTaskStatus: (taskId: string, status: TaskStatus) => void
  updateTask: (taskId: string, taskData: TaskUpdates) => boolean
  deleteTask: (taskId: string) => void
  clearCompletedTasks: () => void
  replaceTaskData: (tasks: Task[], quickTasks: QuickTask[]) => boolean
}

// El valor real se asigna en TaskProvider.
export const TaskContext = createContext<TaskContextValue | null>(null)
