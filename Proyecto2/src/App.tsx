import fotoPerfil from './assets/image.jpg'
import Tarjeta from './components/tarjeta'
import StudioLayout from './components/StudioLayout/StudioLayout'

function App() {
  return (
    <StudioLayout number="02" label="Identidad personal" title="Las personas hacen la diferencia." description="Detrás de cada proyecto hay una persona. Un nombre, una mirada y una manera propia de hacer las cosas." note="Una presentación simple. Una identidad propia.">
      <Tarjeta nombre="Fulano" apellido="Mengano" profesion="Agarrador de pala" imagen={fotoPerfil} />
    </StudioLayout>
  )
}

export default App
