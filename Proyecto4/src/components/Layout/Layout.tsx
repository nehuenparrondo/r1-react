/**
 * Guía de lectura. Componente reutilizable Layout. Sus props conectan contenido y acciones
 * con el componente que lo usa; para seguir el dato, buscar sus importaciones y los
 * callbacks recibidos en lugar de suponer que guarda directamente en una base.
 */

import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../Header/Header'
import ScrollTopButton from '../ScrollTopButton/ScrollTopButton'
import './Layout.css'

function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Cada pantalla abre desde arriba, aunque la anterior estuviera desplazada.
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="layout">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header />
      <main className="layout__main" id="contenido"><Outlet /></main>
      <footer className="layout__footer"><span>NODO / Un espacio para avanzar.</span><span>Tus tareas, a tu ritmo.</span></footer>
      <ScrollTopButton />
    </div>
  )
}

export default Layout
