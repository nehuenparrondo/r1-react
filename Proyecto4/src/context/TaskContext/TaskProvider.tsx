/**
 * Guía de lectura. Es el centro del gestor de tareas: comparte el estado entre páginas y
 * concentra todas las escrituras en localStorage. La pantalla solicita una operación; este
 * proveedor decide si se permite y guarda la lista completa.
 */

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
/**
 * Lee la clave lista-de-tareas del navegador. JSON.parse reconstruye los objetos; si falta
 * el dato o no se puede interpretar, devuelve una lista vacía. No consulta un servidor.
 */
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
/**
 * Recupera los atajos del almacenamiento del navegador. Son plantillas para crear tareas:
 * no son una segunda lista de tareas activas.
 */
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

/**
 * Envuelve las pantallas y es dueño del estado compartido. useState(loadTasks) lee el
 * almacenamiento al iniciar; las referencias permiten validar también dos envíos
 * consecutivos antes del próximo render.
 */
export function TaskProvider({ children }: { children: ReactNode }) {
  // Pasar funciones a useState evita leer localStorage en cada renderizado.
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [quickTasks, setQuickTasks] = useState<QuickTask[]>(loadQuickTasks)
  const tasksRef = useRef(tasks)
  const quickTasksRef = useRef(quickTasks)

  // Las referencias se actualizan inmediatamente para bloquear también envíos consecutivos.
  /**
   * Recibe la lista completa ya modificada. La convierte a texto JSON para localStorage,
   * actualiza la referencia inmediata y llama a setTasks para volver a dibujar la pantalla.
   * Guardar no descarga un archivo.
   */
  function saveTasks(updatedTasks: Task[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))
    tasksRef.current = updatedTasks
    setTasks(updatedTasks)
  }

  /**
   * Conserva las plantillas en una clave distinta de las tareas y sincroniza su referencia y
   * estado de React. No cambia las tareas creadas anteriormente.
   */
  function saveQuickTasks(updatedQuickTasks: QuickTask[]) {
    localStorage.setItem(QUICK_TASKS_STORAGE_KEY, JSON.stringify(updatedQuickTasks))
    quickTasksRef.current = updatedQuickTasks
    setQuickTasks(updatedQuickTasks)
  }

  /**
   * Recibe título, descripción y fecha de entrega. Rechaza títulos vacíos, largos o
   * repetidos; agrega ID, fecha de creación y estado pendiente. Devuelve la tarea creada, o
   * null si no se pudo crear.
   */
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

  /**
   * Recibe un ID y el nuevo estado. Recorre la lista sin modificar los otros elementos y usa
   * el mismo guardado central que el alta.
   */
  function updateTaskStatus(taskId: string, status: TaskStatus) {
    saveTasks(tasksRef.current.map((task) =>
      task.id === taskId ? { ...task, status } : task,
    ))
  }

  /**
   * Busca una tarea por ID y valida el nuevo título contra el resto. No permite editar una
   * completada. Guarda la lista modificada y devuelve si aceptó el cambio.
   */
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

  /**
   * Transforma una tarea sin fecha en una plantilla reutilizable. Rechaza plantillas con el
   * mismo título; devuelve si pudo agregarla.
   */
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

  /**
   * Quita únicamente la plantilla indicada. Las tareas que ya se crearon a partir de ella
   * siguen existiendo.
   */
  function removeQuickTask(quickTaskId: string) {
    saveQuickTasks(quickTasksRef.current.filter((quickTask) => quickTask.id !== quickTaskId))
  }

  /**
   * Filtra la lista por ID, pero elimina solo si esa tarea está completada. La regla se
   * aplica aquí aunque otro componente intente saltarse el botón.
   */
  function deleteTask(taskId: string) {
    // Sólo los elementos completados se pueden borrar, incluso fuera de la interfaz.
    saveTasks(tasksRef.current.filter((task) => task.id !== taskId || task.status !== 'completed'))
  }

  /**
   * Guarda una nueva lista que conserva solo las tareas no completadas; no borra las
   * plantillas de atajos.
   */
  function clearCompletedTasks() {
    saveTasks(tasksRef.current.filter((task) => task.status !== 'completed'))
  }

  /**
   * Recibe tareas y plantillas importadas, ya interpretadas por el lector de respaldos.
   * Rechaza títulos repetidos y reemplaza almacenamiento, referencias y estado; no combina
   * con la lista anterior.
   */
  function replaceTaskData(importedTasks: Task[], importedQuickTasks: QuickTask[]) {
    // La importación tampoco puede introducir títulos repetidos.
    if (!hasUniqueTitles(importedTasks) || !hasUniqueTitles(importedQuickTasks)) return false
    // La interfaz ya confirmó el reemplazo. Estas dos escrituras son independientes:
    // localStorage no ofrece una transacción si la segunda clave falla al guardarse.
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
