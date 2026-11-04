/**
 * Guía de lectura. Composición del ejercicio: conecta el marco visual con el componente
 * que demuestra el concepto de React. Los datos por props y el estado local pertenecen al
 * ejercicio; aquí no existe un backend.
 */

import StudioLayout from './components/StudioLayout/StudioLayout'
import Counter from './components/counter/Counter'

function App() {
  return (
    <StudioLayout number="03" label="Contador interactivo" title="Cada paso cuenta." description="Sumá, restá y encontrá tu propio ritmo. Los grandes cambios también empiezan de a uno." note="Un toque para avanzar. Otro para volver.">
      <Counter />
    </StudioLayout>
  )
}

export default App
