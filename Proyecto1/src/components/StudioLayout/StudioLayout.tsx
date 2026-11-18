/**
 * Estructura compartida de cada ejercicio de R1. Recibe textos y contenido por props, compone cabecera y pie y coloca el selector de tema.
 */

import type { ReactNode } from 'react'
import ThemeButton from '../themeButton/themeButton.tsx'
import './StudioLayout.css'

type StudioLayoutProps = {
  number: string
  label: string
  title: string
  description: string
  note: string
  children: ReactNode
}

// La cabecera, el pie y el cambio de tema comparten una misma estructura accesible.
function StudioLayout({ number, label, title, description, note, children }: StudioLayoutProps) {
  return (
    <div className="studio">
      <header className="studio__header">
        <div className="studio__brand"><span className="studio__mark" aria-hidden="true"><i /><i /><i /><i /></span>NODO<span className="sr-only"> · Experiencias interactivas</span></div>
        <div className="studio__header-right"><span className="studio__collection">Pequeñas experiencias</span><ThemeButton /></div>
      </header>
      <main className="studio__main">
        <div className="studio__intro">
          <span className="studio__eyebrow">{number} / {label}</span>
          <h1>{title}</h1>
          <p className="studio__description">{description}</p>
          <p className="studio__note"><span aria-hidden="true">↗</span>{note}</p>
        </div>
        <div className="studio__stage">{children}</div>
      </main>
      <footer className="studio__footer"><span>NODO / Colección de experiencias</span><span>{number} — 05</span></footer>
    </div>
  )
}

export default StudioLayout
