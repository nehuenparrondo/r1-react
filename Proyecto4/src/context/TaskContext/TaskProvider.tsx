import { useRef, useState, type ReactNode } from 'react'
import type { NewTask, QuickTask, Task, TaskStatus, TaskUpdates } from '../../types/Task'
import { hasUniqueTitles, normalizeTitle } from '../../utils/normalizeTitle'
import { TaskContext } from './taskContextDefinition'

const STORAGE_KEY = 'lista-de-tareas'
const QUICK_TASKS_STORAGE_KEY = 'tareas-rapidas'

// Se usa al migrar tareas antiguas que todavía no tenían fecha de entrega.
function getDefaultDueDate(createdAt: string) {
  const dueDate = new Date(createdAt)
  dueDate.setDate(dueDate.getDate() + 7)
  return dueDate.toISOString().slice(0, 10)
}

// Recupera las tareas y adapta datos guardados por versiones anteriores.
function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY)
    if (!savedTasks) return []

    const parsedTasks = JSON.parse(savedTasks) as Array<Task & { completed?: boolean }>
    return parsedTasks.map(({ completed, ...task }) => ({
      ...task,
      description: task.description?.trim() || 'Sin descripción',
      dueDate: task.dueDate === undefined ? getDefaultDueDate(task.createdAt) : task.dueDate,
      status: task.status ?? (completed ? 'completed' : 'pending'),
    }))
  } catch {
    // Si el almacenamiento está dañado, la aplicación puede iniciar vacía.
    return []
  }
}

// Los atajos se guardan aparte porque no son tareas activas.
function loadQuickTasks() {
  try {
    const savedQuickTasks = localStorage.getItem(QUICK_TASKS_STORAGE_KEY)
    if (!savedQuickTasks) return []

    const parsedQuickTasks = JSON.parse(savedQuickTasks) as QuickTask[]
    return parsedQuickTasks
      .filter((quickTask) => quickTask.id && quickTask.title?.trim())
      .map((quickTask) => ({
        ...quickTask,
        description: quickTask.description?.trim() || 'Sin descripción',
      }))
  } catch {
    return []
  }
}

export function TaskProvider({ children }: { children: ReactNode }) {
  // Pasar funciones a useState evita leer localStorage en cada renderizado.
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [quickTasks, setQuickTasks] = useState<QuickTask[]>(loadQuickTasks)
  const tasksRef = useRef(tasks)
  const quickTasksRef = useRef(quickTasks)

  // Las referencias se actualizan inmediatamente para bloquear también envíos consecutivos.
  function saveTasks(updatedTasks: Task[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))
    tasksRef.current = updatedTasks
    setTasks(updatedTasks)
  }

  function saveQuickTasks(updatedQuickTasks: QuickTask[]) {
    localStorage.setItem(QUICK_TASKS_STORAGE_KEY, JSON.stringify(updatedQuickTasks))
    quickTasksRef.current = updatedQuickTasks
    setQuickTasks(updatedQuickTasks)
  }

  function addTask(taskData: NewTask) {
    const title = taskData.title.trim()
    // Una tarea completada también reserva su título mientras siga en la lista.
    if (!title || title.length > 80 || tasksRef.current.some(
      (task) => normalizeTitle(task.title) === normalizeTitle(title),
    )) return null

    // Los campos de sistema se generan aquí para que todas las altas sean consistentes.
    const newTask: Task = {
      ...taskData,
      title,
      description: taskData.description.trim() || 'Sin descripción',
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'pending',
    }

    saveTasks([...tasksRef.current, newTask])

    return newTask
  }

  function updateTaskStatus(taskId: string, status: TaskStatus) {
    saveTasks(tasksRef.current.map((task) =>
      task.id === taskId ? { ...task, status } : task,
    ))
  }

  function updateTask(taskId: string, taskData: TaskUpdates) {
    const title = taskData.title.trim()
    const existingTask = tasksRef.current.find((task) => task.id === taskId)
    if (!existingTask || existingTask.status === 'completed' || !title || title.length > 80) return false
    if (tasksRef.current.some((task) =>
      task.id !== taskId && normalizeTitle(task.title) === normalizeTitle(title),
    )) return false

    saveTasks(tasksRef.current.map((task) => task.id === taskId ? {
      ...task,
      ...taskData,
      title,
      description: taskData.description.trim() || 'Sin descripción',
    } : task))
    return true
  }

  function addQuickTask(task: Task) {
    // Los atajos representan tareas reutilizables sin una fecha específica.
    if (task.dueDate) return false

    // La comparación normalizada evita duplicados por mayúsculas, acentos o espacios.
    if (quickTasksRef.current.some((quickTask) => normalizeTitle(quickTask.title) === normalizeTitle(task.title))) {
      return false
    }

    const newQuickTask: QuickTask = {
      id: crypto.randomUUID(),
      title: task.title,
      description: task.description,
    }

    saveQuickTasks([...quickTasksRef.current, newQuickTask])
    return true
  }

  function removeQuickTask(quickTaskId: string) {
    saveQuickTasks(quickTasksRef.current.filter((quickTask) => quickTask.id !== quickTaskId))
  }

  function deleteTask(taskId: string) {
    // Sólo los elementos completados se pueden borrar, incluso fuera de la interfaz.
    saveTasks(tasksRef.current.filter((task) => task.id !== taskId || task.status !== 'completed'))
  }

  function clearCompletedTasks() {
    saveTasks(tasksRef.current.filter((task) => task.status !== 'completed'))
  }

  function replaceTaskData(importedTasks: Task[], importedQuickTasks: QuickTask[]) {
    // La importación tampoco puede introducir títulos repetidos.
    if (!hasUniqueTitles(importedTasks) || !hasUniqueTitles(importedQuickTasks)) return false
    // La importación se confirma antes de llegar aquí y reemplaza ambos conjuntos juntos.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(importedTasks))
    localStorage.setItem(QUICK_TASKS_STORAGE_KEY, JSON.stringify(importedQuickTasks))
    tasksRef.current = importedTasks
    quickTasksRef.current = importedQuickTasks
    setTasks(importedTasks)
    setQuickTasks(importedQuickTasks)
    return true
  }

  return (
    // Cualquier descendiente puede leer el estado o ejecutar estas operaciones.
    <TaskContext.Provider value={{
      tasks,
      quickTasks,
      addTask,
      addQuickTask,
      removeQuickTask,
      updateTaskStatus,
      updateTask,
      deleteTask,
      clearCompletedTasks,
      replaceTaskData,
    }}>
      {children}
    </TaskContext.Provider>
  )
}
