/**
 * Guía de lectura. Respaldo manual del gestor. Descargar genera un archivo JSON
 * independiente de localStorage; Cargar valida un archivo y pide confirmación antes de
 * reemplazar datos existentes.
 */

import { useId, useRef, useState, type ChangeEvent } from 'react'
import { useTasks } from '../../context/TaskContext/useTasks'
import { createTaskBackup, parseTaskBackup, type TaskBackup } from '../../utils/taskBackup'
import './TaskDataControls.css'

type Feedback = {
  type: 'error' | 'success'
  message: string
}

function TaskDataControls() {
  const { tasks, quickTasks, replaceTaskData } = useTasks()
  const [pendingBackup, setPendingBackup] = useState<TaskBackup | null>(null)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const dialogTitleId = useId()

  /**
   * Toma el estado actual, construye un Blob JSON y activa un enlace de descarga. El
   * navegador decide dónde guardar el archivo; después se libera la URL temporal.
   */
  function downloadBackup() {
    const backup = createTaskBackup(tasks, quickTasks)
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
    const downloadUrl = URL.createObjectURL(blob)
    const anchor = document.createElement('a')

    anchor.href = downloadUrl
    anchor.download = `tareas-r2-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000)
    setFeedback({ type: 'success', message: 'Respaldo descargado correctamente.' })
  }

  /**
   * Entrega las listas validadas al proveedor de tareas y muestra el resultado. No informa
   * éxito cuando el proveedor rechaza duplicados.
   */
  function applyBackup(backup: TaskBackup) {
    if (!replaceTaskData(backup.tasks, backup.quickTasks)) {
      setFeedback({ type: 'error', message: 'No se puede cargar un respaldo con tareas repetidas.' })
      return
    }
    setFeedback({
      type: 'success',
      message: `Se cargaron ${backup.tasks.length} tareas y ${backup.quickTasks.length} tareas rápidas.`,
    })
  }

  /**
   * Lee el archivo seleccionado y valida su contenido. Si ya existen datos, espera una
   * confirmación antes de reemplazarlos. Captura errores para mostrarlos dentro de la
   * página.
   */
  async function loadBackup(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      const backup = parseTaskBackup(await file.text())
      setFeedback(null)

      if (tasks.length > 0 || quickTasks.length > 0) {
        setPendingBackup(backup)
        dialogRef.current?.showModal()
        return
      }

      applyBackup(backup)
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'No se pudo leer el archivo.',
      })
    }
  }

  function closeDialog() {
    dialogRef.current?.close()
    setPendingBackup(null)
  }

  /**
   * Aplica el respaldo pendiente solo después de la confirmación explícita; cerrar el
   * diálogo sin confirmar no importa datos.
   */
  function confirmReplacement() {
    if (!pendingBackup) return
    const backup = pendingBackup
    closeDialog()
    applyBackup(backup)
  }

  return (
    <div className="task-data">
      <div className="task-data__actions" aria-label="Importar y exportar tareas">
        <button className="button button--secondary" type="button" onClick={downloadBackup}>
          <span aria-hidden="true">↓</span> Descargar
        </button>
        <label className="button button--secondary task-data__load">
          <span aria-hidden="true">↑</span> Cargar
          <input
            className="task-data__file"
            type="file"
            accept="application/json,.json"
            onChange={loadBackup}
            aria-label="Cargar respaldo de tareas"
          />
        </label>
      </div>

      {feedback && (
        <p className={`task-data__feedback task-data__feedback--${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>
          {feedback.message}
        </p>
      )}

      <dialog
        className="delete-dialog task-data__dialog"
        ref={dialogRef}
        aria-labelledby={dialogTitleId}
        onCancel={(event) => {
          event.preventDefault()
          closeDialog()
        }}
        onClose={() => setPendingBackup(null)}
      >
        <div className="delete-dialog__mark" aria-hidden="true">!</div>
        <h2 id={dialogTitleId}>¿Reemplazar todo?</h2>
        <p>
          Ya existen tareas guardadas. La carga reemplazará todas las tareas y tareas rápidas actuales.
        </p>
        {pendingBackup && (
          <p className="task-data__summary">
            El archivo contiene <strong>{pendingBackup.tasks.length}</strong> tareas y{' '}
            <strong>{pendingBackup.quickTasks.length}</strong> tareas rápidas.
          </p>
        )}
        <div className="delete-dialog__actions">
          <button className="button button--danger" type="button" onClick={confirmReplacement}>Reemplazar todo</button>
          <button className="button button--secondary" type="button" onClick={closeDialog}>Cancelar</button>
        </div>
      </dialog>
    </div>
  )
}

export default TaskDataControls
