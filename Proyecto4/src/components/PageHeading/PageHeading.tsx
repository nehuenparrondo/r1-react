/**
 * Guía de lectura. Componente reutilizable PageHeading. Sus props conectan contenido y
 * acciones con el componente que lo usa; para seguir el dato, buscar sus importaciones y
 * los callbacks recibidos en lugar de suponer que guarda directamente en una base.
 */

import type { ReactNode } from 'react'
import './PageHeading.css'

type PageHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  actions?: ReactNode
}

// Encabezado reutilizable para mantener la misma jerarquía visual en cada página.
function PageHeading({ eyebrow, title, description, actions }: PageHeadingProps) {
  return (
    <div className="page-heading">
      <div className="page-heading__copy">
        <span className="page-heading__eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {/* Los bloques opcionales sólo ocupan espacio cuando fueron enviados. */}
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="page-heading__actions">{actions}</div>}
    </div>
  )
}

export default PageHeading
