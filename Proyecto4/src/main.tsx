/**
 * Guía de lectura. Punto de entrada del navegador: monta React sobre el elemento raíz del
 * HTML e instala los proveedores/navegación declarados. No es un servidor Node.js ni una
 * conexión a la base.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Monta la aplicación en el único nodo raíz del HTML.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Habilita la navegación interna sin recargar la página. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
