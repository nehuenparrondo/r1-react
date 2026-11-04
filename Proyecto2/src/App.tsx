/** App conserva el perfil y pasa datos y callbacks por props; guardar persiste en el navegador. */
import { useState } from 'react'
import fotoPerfil from './assets/image.jpg'
import Tarjeta from './components/tarjeta'
import TarjetaForm from './components/TarjetaForm'
import ConfirmarEliminacion from './components/ConfirmarEliminacion'
import StudioLayout from './components/StudioLayout/StudioLayout'
import { cargarTarjeta, guardarTarjeta } from './services/tarjetaStorage'
import type { DatosTarjeta } from './types/tarjeta'

const DATOS_INICIALES: DatosTarjeta = { nombre: 'Fulano', apellido: 'Mengano', profesion: 'Agarrador de pala' }
const DATOS_VACIOS: DatosTarjeta = { nombre: '', apellido: '', profesion: '' }

function App() {
  const [datos, setDatos] = useState<DatosTarjeta | null>(() => cargarTarjeta(DATOS_INICIALES))
  const [editando, setEditando] = useState(false)
  const [confirmandoEliminacion, setConfirmandoEliminacion] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  function editarTarjeta() {
    setMensaje('')
    setError('')
    setEditando(true)
  }

  function guardarDatos(nuevosDatos: DatosTarjeta) {
    try {
      guardarTarjeta(nuevosDatos)
      setDatos(nuevosDatos)
      setEditando(false)
      setError('')
      setMensaje('Tarjeta guardada. Tus datos se conservarán al recargar este navegador.')
    } catch {
      setError('No se pudo guardar la tarjeta. Revisá el almacenamiento del navegador e intentá de nuevo.')
    }
  }

  function eliminarTarjeta() {
    try {
      guardarTarjeta(null)
      setDatos(null)
      setConfirmandoEliminacion(false)
      setError('')
      setMensaje('Tarjeta eliminada.')
    } catch {
      setError('No se pudo eliminar la tarjeta guardada. Intentá de nuevo.')
    }
  }

  function cancelarEdicion() {
    setEditando(false)
    setError('')
  }

  return (
    <StudioLayout number="02" label="Identidad personal" title="Las personas hacen la diferencia." description="Una presentación simple, con tus propios datos. Editá tu tarjeta y guardá una identidad que te represente." note="Los datos viajan por props y se guardan solo en este navegador.">
      <div className="tarjeta-manager">
        {mensaje && <p className="tarjeta-feedback" role="status">{mensaje}</p>}
        {error && !confirmandoEliminacion && <p className="tarjeta-feedback tarjeta-feedback--error" role="alert">{error}</p>}
        {datos && <Tarjeta {...datos} imagen={fotoPerfil} editando={editando} onEditar={editarTarjeta} onEliminar={() => { setError(''); setMensaje(''); setConfirmandoEliminacion(true) }} />}
        {!datos && !editando && (
          <section className="tarjeta-empty" aria-labelledby="sin-tarjeta-title">
            <span className="tarjeta__etiqueta">Un nuevo comienzo</span>
            <h2 id="sin-tarjeta-title">Todavía no hay una tarjeta</h2>
            <p>Creá una nueva presentación con tu nombre, apellido y profesión.</p>
            <button className="tarjeta-button tarjeta-button--primary" type="button" onClick={editarTarjeta}>Crear nueva tarjeta</button>
          </section>
        )}
        {editando && <TarjetaForm datosIniciales={datos ?? DATOS_VACIOS} onGuardar={guardarDatos} onCancelar={cancelarEdicion} />}
        {confirmandoEliminacion && datos && <ConfirmarEliminacion nombreCompleto={`${datos.nombre} ${datos.apellido}`} error={error} onConfirmar={eliminarTarjeta} onCancelar={() => { setConfirmandoEliminacion(false); setError('') }} />}
      </div>
    </StudioLayout>
  )
}

export default App
