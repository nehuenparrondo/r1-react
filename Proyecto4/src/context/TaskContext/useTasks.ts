/**
 * Guía de lectura. Es la puerta de entrada al contexto de tareas. Evita pasar toda la
 * lista por props entre páginas y detecta si falta el proveedor.
 */

import { useContext } from 'react'
import { TaskContext } from './taskContextDefinition'

// Centraliza el acceso al contexto para que los componentes no repitan useContext.
/**
 * Entrega a cada pantalla las tareas y operaciones del contexto compartido. Falla si se
 * llama fuera de TaskProvider, porque allí no existiría una lista común.
 */
export function useTasks() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTasks debe utilizarse dentro de TaskProvider.')
  }

  return context
}
