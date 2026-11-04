/**
 * Guía de lectura. Componente reutilizable StatusBadge. Sus props conectan contenido y
 * acciones con el componente que lo usa; para seguir el dato, buscar sus importaciones y
 * los callbacks recibidos en lugar de suponer que guarda directamente en una base.
 */

import './StatusBadge.css'
import type { TaskStatus } from '../../types/Task'

// Relaciona cada valor interno con el texto que ve el usuario.
const statusConfig: Record<TaskStatus, { label: string }> = {
  pending: { label: 'Pendiente' },
  'in-progress': { label: 'En proceso' },
  completed: { label: 'Completada' },
}

function StatusBadge({ status }: { status: TaskStatus }) {
  const config = statusConfig[status]

  return (
    <span className={`status-badge status-badge--${status}`}>
      {config.label}
    </span>
  )
}

export default StatusBadge
