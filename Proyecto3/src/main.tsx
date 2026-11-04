/**
 * Guía de lectura. Punto de entrada del navegador: monta React sobre el elemento raíz del
 * HTML e instala los proveedores/navegación declarados. No es un servidor Node.js ni una
 * conexión a la base.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
