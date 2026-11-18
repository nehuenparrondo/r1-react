/** El estado elige una variante; su clase CSS transforma el saludo completo. */
import { useState } from 'react'
import './helloWorld.css'

const ESTILOS = [
  { clase: 'esencial', nombre: 'Esencial', descripcion: 'Letras limpias y un acento lima.' },
  { clase: 'editorial', nombre: 'Editorial', descripcion: 'Una tipografía clásica con una mirada distinta.' },
  { clase: 'terminal', nombre: 'Terminal', descripcion: 'Espaciado monoespaciado, como una línea de código.' },
  { clase: 'contorno', nombre: 'Contorno', descripcion: 'El mismo mensaje, dibujado con sus bordes.' },
  { clase: 'cartel', nombre: 'Cartel', descripcion: 'Contraste, volumen y una composición más expresiva.' },
]

function HelloWorld() {
  const [indiceEstilo, setIndiceEstilo] = useState(0)
  const estilo = ESTILOS[indiceEstilo]

  /** El resto de la división vuelve al primer estilo después del quinto. */
  function cambiarEstilo() {
    setIndiceEstilo((actual) => (actual + 1) % ESTILOS.length)
  }

  return (
    <section id="holamundo" className={`hello hello--${estilo.clase}`} aria-label="Saludo interactivo">
      <div className="hello__top"><span>Un saludo universal</span><span>{String(indiceEstilo + 1).padStart(2, '0')} / 05</span></div>
      <h2 className="hello__saludo">Hola, mundo!</h2>
      <div className="hello__controls">
        <div className="hello__style" role="status" aria-live="polite" aria-atomic="true">
          <span className="hello__style-name">{estilo.nombre}</span>
          <p>{estilo.descripcion}</p>
        </div>
        <button className="hello__button" type="button" onClick={cambiarEstilo}>Cambiar estilo <span aria-hidden="true">↗</span></button>
      </div>
      <div className="hello__bottom"><span>Un mensaje. Cinco personalidades.</span><span>React + CSS</span></div>
    </section>
  )
}

export default HelloWorld
