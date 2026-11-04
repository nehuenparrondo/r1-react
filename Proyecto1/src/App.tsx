/**
 * Guía de lectura. Composición del ejercicio: conecta el marco visual con el componente
 * que demuestra el concepto de React. Los datos por props y el estado local pertenecen al
 * ejercicio; aquí no existe un backend.
 */

import StudioLayout from './components/StudioLayout/StudioLayout'
import HelloWorld from './components/helloWorld/helloWorld'

function App() {
  return (
    <StudioLayout number="01" label="Exploración tipográfica" title="Una idea, muchas formas." description="Un mismo hola puede tener muchas personalidades. Explorá cinco maneras de decirlo con tipografía, color y composición." note="Tocá el botón para cambiar el estilo del saludo.">
      <HelloWorld />
    </StudioLayout>
  )
}

export default App
