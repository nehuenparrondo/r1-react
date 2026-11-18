/**
 * Composición de este ejercicio de React. Entrega título y descripción a StudioLayout y monta el componente interactivo dentro de su contenido.
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
