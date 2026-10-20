import { useState } from 'react'
import type { SyntheticEvent } from 'react'
import { isAllowedNameInput, isValidName } from '../../utils/validateName'
import './FormularioSaludo.css'

function obtenerSaludo(hora: number) {
  if (hora >= 19 || hora < 5) return 'Buenas noches'
  if (hora < 13) return 'Buen día'
  return 'Buenas tardes'
}



function FormularioSaludo() {
  const [nombre, setNombre] = useState('')
  const [saludo, setSaludo] = useState('')
  const [error, setError] = useState('')

  function actualizarNombre(value: string) {
    setSaludo('')
    // Se rechaza la edición completa para no convertir silenciosamente "Ana123" en "Ana".
    if (!isAllowedNameInput(value)) {
      setError('Solo se permiten letras y espacios. No uses números ni caracteres especiales.')
      return
    }
    setNombre(value.normalize('NFC'))
    setError('')
  }

  function enviarFormulario(
    evento: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    evento.preventDefault()
    const nombreLimpio = nombre.normalize('NFC').trim().replace(/ +/g, ' ')
    // Limpia el resultado anterior para no mostrar un saludo junto a un error.
    setSaludo('')
    setError('')
    if (!isValidName(nombre)) {
      setError('Ingresá un nombre de entre 2 y 50 caracteres, usando solo letras y espacios.')
      return
    }
    setSaludo(`${obtenerSaludo(new Date().getHours())}, ${nombreLimpio}.`)
  }

  return (
    <>
      <form className="formulario-saludo" onSubmit={enviarFormulario}>
        <label htmlFor="nombre">Nombre</label>
        <div className="fila-formulario">
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(evento) => actualizarNombre(evento.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'nombre-error' : undefined}
            maxLength={50}
            placeholder="Tu nombre"
            autoComplete="name"
          />
          <button type="submit">Saludar</button>
        </div>
        {error && <p className="error" id="nombre-error" role="alert">{error}</p>}
      </form>

      {saludo && (
        <p className="saludo" aria-live="polite">
          {saludo}
        </p>
      )}
    </>
  )
}

export default FormularioSaludo
