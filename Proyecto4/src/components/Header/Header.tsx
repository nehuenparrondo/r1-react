/**
 * Guía de lectura. Componente reutilizable Header. Sus props conectan contenido y acciones
 * con el componente que lo usa; para seguir el dato, buscar sus importaciones y los
 * callbacks recibidos en lugar de suponer que guarda directamente en una base.
 */

import { Link, NavLink } from 'react-router-dom'
import ThemeButton from '../ThemeButton/ThemeButton'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <Link className="header__brand" to="/" aria-label="NODO Tareas · Ir al inicio"><span aria-hidden="true">n.</span>NODO<span className="header__product">Tareas</span></Link>
      <div className="header__right">
        <nav className="header__nav" aria-label="Navegación principal">
          <NavLink to="/" end>Mi tablero</NavLink>
          <NavLink to="/tareas/nueva">Nueva tarea</NavLink>
        </nav>
        <ThemeButton />
      </div>
    </header>
  )
}

export default Header
