import StudioLayout from './components/StudioLayout/StudioLayout'
import FormularioSaludo from './components/FormularioSaludo/FormularioSaludo'
import './App.css'

function App() {
  return (
    <StudioLayout number="05" label="Saludo personalizado" title="Todo empieza con un hola." description="Las mejores conversaciones empiezan por conocernos. Contanos tu nombre y recibí un saludo para este momento del día." note="Un pequeño gesto para empezar bien.">
      <section className="welcome-card" aria-labelledby="welcome-title">
        <div className="welcome-card__icon" aria-hidden="true">✳</div>
        <span className="eyebrow">Qué bueno verte por acá</span>
        <h2 id="welcome-title">¿Cómo te llamás?</h2>
        <p className="description">Hagamos este saludo un poco más personal.</p>
        <FormularioSaludo />
        <p className="welcome-card__note">Tu nombre se usa solamente para mostrar el saludo.</p>
      </section>
    </StudioLayout>
  )
}

export default App
