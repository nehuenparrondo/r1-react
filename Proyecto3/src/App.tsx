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
