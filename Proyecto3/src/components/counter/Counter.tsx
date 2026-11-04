/**
 * Guía de lectura. Ejercicio de estado local: los botones actualizan el contador con el
 * valor anterior y React vuelve a mostrarlo. No hay API ni persistencia del contador entre
 * recargas.
 */

import { useState } from 'react'
import './Counter.css'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <section className="counter" aria-label="Contador">
      <div className="counter__top"><span>Tu punto de partida</span><span aria-hidden="true">↗</span></div>
      <span className="counter__label">Valor actual</span>
      <output className="counter__value" aria-live="polite" aria-atomic="true">{count}</output>
      <div className="counter__controls">
        <button className="counter__button" type="button" aria-label="Restar uno" onClick={() => setCount((currentCount) => currentCount - 1)}><span aria-hidden="true">−</span><span>Restar</span></button>
        <button className="counter__button counter__button--add" type="button" aria-label="Sumar uno" onClick={() => setCount((currentCount) => currentCount + 1)}><span aria-hidden="true">+</span><span>Sumar</span></button>
      </div>
      <p className="counter__hint">Sin límites. Paso a paso.</p>
    </section>
  )
}

export default Counter
