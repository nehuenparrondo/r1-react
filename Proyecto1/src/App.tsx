import StudioLayout from './components/StudioLayout/StudioLayout'
import HelloWorld from './components/helloWorld/helloWorld'

function App() {
  return (
    <StudioLayout number="01" label="Exploración tipográfica" title="Una idea, muchas formas." description="A veces, el primer saludo es todo lo que hace falta. Explorá cómo una palabra cambia con cada letra." note="Pasá el cursor o enfocá una letra para explorar.">
      <HelloWorld />
    </StudioLayout>
  )
}

export default App
