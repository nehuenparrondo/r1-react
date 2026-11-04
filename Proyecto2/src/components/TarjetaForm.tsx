import { useState, type FormEvent } from 'react'
import type { DatosTarjeta } from '../types/tarjeta'

type TarjetaFormProps = {
  datosIniciales: DatosTarjeta
  onGuardar: (datos: DatosTarjeta) => void
  onCancelar: () => void
}

/** El borrador es local: cancelar no cambia la tarjeta confirmada por el padre. */
function TarjetaForm({ datosIniciales, onGuardar, onCancelar }: TarjetaFormProps) {
  const [borrador, setBorrador] = useState(datosIniciales)
  const [error, setError] = useState('')

  function enviarFormulario(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const datos = { nombre: borrador.nombre.trim(), apellido: borrador.apellido.trim(), profesion: borrador.profesion.trim() }
    if (!datos.nombre || !datos.apellido || !datos.profesion) {
      setError('Completá nombre, apellido y profesión. No pueden contener solo espacios.')
      return
    }
    if (datos.nombre.length > 60 || datos.apellido.length > 60 || datos.profesion.length > 100) {
      setError('Nombre y apellido admiten hasta 60 caracteres; profesión, hasta 100.')
      return
    }
    setError('')
    onGuardar(datos)
  }

  return (
    <form className="tarjeta-form" aria-labelledby="tarjeta-form-title" onSubmit={enviarFormulario} noValidate>
      <span className="tarjeta__etiqueta">Tu información</span>
      <h2 id="tarjeta-form-title">Editá los datos de tu tarjeta</h2>
      <p>Los cambios se aplican cuando tocás Guardar.</p>
      <div className="tarjeta-form__fields">
        <label htmlFor="tarjeta-nombre">Nombre
          <input id="tarjeta-nombre" name="nombre" autoComplete="given-name" value={borrador.nombre} maxLength={60} required onChange={(event) => setBorrador({ ...borrador, nombre: event.target.value })} />
        </label>
        <label htmlFor="tarjeta-apellido">Apellido
          <input id="tarjeta-apellido" name="apellido" autoComplete="family-name" value={borrador.apellido} maxLength={60} required onChange={(event) => setBorrador({ ...borrador, apellido: event.target.value })} />
        </label>
        <label className="tarjeta-form__wide" htmlFor="tarjeta-profesion">Profesión
          <input id="tarjeta-profesion" name="profesion" autoComplete="organization-title" value={borrador.profesion} maxLength={100} required onChange={(event) => setBorrador({ ...borrador, profesion: event.target.value })} />
        </label>
      </div>
      {error && <p className="tarjeta-feedback tarjeta-feedback--error" role="alert">{error}</p>}
      <div className="tarjeta-actions">
        <button className="tarjeta-button tarjeta-button--primary" type="submit">Guardar</button>
        <button className="tarjeta-button" type="button" onClick={onCancelar}>Cancelar edición</button>
      </div>
    </form>
  )
}

export default TarjetaForm
