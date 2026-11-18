/** Administra la colección y pasa cada perfil y sus acciones mediante props. */
import { useState } from 'react'
import fotoPerfil from './assets/image.jpg'
import Tarjeta from './components/tarjeta'
import TarjetaForm from './components/TarjetaForm'
import ConfirmarEliminacion from './components/ConfirmarEliminacion'
import StudioLayout from './components/StudioLayout/StudioLayout'
import { cargarTarjetas, guardarTarjetas } from './services/tarjetaStorage'
import type { DatosTarjeta, TarjetaGuardada } from './types/tarjeta'

const DATOS_INICIALES: DatosTarjeta = {
  nombre: 'Fulano', apellido: 'Mengano', profesion: 'Agarrador de pala',
}
const DATOS_VACIOS: DatosTarjeta = { nombre: '', apellido: '', profesion: '' }
type Editor = { id: string | null; datos: DatosTarjeta }

function App() {
  const [tarjetas, setTarjetas] = useState(() => cargarTarjetas(DATOS_INICIALES))
  const [editor, setEditor] = useState<Editor | null>(null)
  const [porEliminar, setPorEliminar] = useState<TarjetaGuardada | null>(null)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  /** Sin argumento abre un alta; con tarjeta conserva su ID para actualizar solo ese perfil. */
  function abrirEditor(tarjeta?: TarjetaGuardada) {
    setMensaje('')
    setError('')
    setEditor({ id: tarjeta?.id ?? null, datos: tarjeta ?? DATOS_VACIOS })
  }

  /**
   * Construye la colección nueva sin modificar la anterior. Primero escribe localStorage
   * y después confirma el estado de React. Si escribir falla, el borrador permanece abierto.
   */
  function guardarDatos(datos: DatosTarjeta) {
    if (!editor) return
    try {
      const nuevasTarjetas = editor.id === null
        ? [...tarjetas, { ...datos, id: crypto.randomUUID() }]
        : tarjetas.map(tarjeta => tarjeta.id === editor.id ? { ...datos, id: tarjeta.id } : tarjeta)
      guardarTarjetas(nuevasTarjetas)
      setTarjetas(nuevasTarjetas)
      setEditor(null)
      setError('')
      setMensaje('Tarjeta guardada. Tus tarjetas se conservarán al recargar este navegador.')
    } catch {
      setError('No se pudo guardar la tarjeta. Revisá el almacenamiento del navegador e intentá de nuevo.')
    }
  }

  /** El diálogo llama aquí al confirmar. Filtra por ID y conserva todas las demás tarjetas. */
  function eliminarTarjeta() {
    if (!porEliminar) return
    try {
      const restantes = tarjetas.filter(tarjeta => tarjeta.id !== porEliminar.id)
      guardarTarjetas(restantes)
      setTarjetas(restantes)
      setPorEliminar(null)
      setError('')
      setMensaje('Tarjeta eliminada.')
    } catch {
      setError('No se pudo eliminar la tarjeta guardada. Intentá de nuevo.')
    }
  }

  return (
    <StudioLayout
      number="02"
      label="Identidad personal"
      title="Las personas hacen la diferencia."
      description="Creá tus tarjetas de presentación. Agregá perfiles, editá sus datos y guardá cada identidad."
      note="Los datos viajan por props y se guardan solo en este navegador."
    >
      <div className="tarjeta-manager">
        <button
          className="tarjeta-button tarjeta-button--primary"
          type="button"
          disabled={editor !== null || porEliminar !== null}
          onClick={() => abrirEditor()}
        >+ Agregar nueva tarjeta</button>
        {mensaje && <p className="tarjeta-feedback" role="status">{mensaje}</p>}
        {error && !porEliminar && <p className="tarjeta-feedback tarjeta-feedback--error" role="alert">{error}</p>}
        {editor && (
          <TarjetaForm
            key={editor.id ?? 'nueva'}
            titulo={editor.id === null ? 'Creá una nueva tarjeta' : 'Editá los datos de tu tarjeta'}
            datosIniciales={editor.datos}
            onGuardar={guardarDatos}
            onCancelar={() => { setEditor(null); setError('') }}
          />
        )}
        {tarjetas.map(tarjeta => (
          <Tarjeta
            key={tarjeta.id}
            {...tarjeta}
            imagen={fotoPerfil}
            editando={editor !== null || porEliminar !== null}
            onEditar={() => abrirEditor(tarjeta)}
            onEliminar={() => { setError(''); setMensaje(''); setPorEliminar(tarjeta) }}
          />
        ))}
        {tarjetas.length === 0 && !editor && (
          <section className="tarjeta-empty" aria-labelledby="sin-tarjeta-title">
            <span className="tarjeta__etiqueta">Un nuevo comienzo</span>
            <h2 id="sin-tarjeta-title">Todavía no hay tarjetas</h2>
            <p>Usá Agregar nueva tarjeta para crear una presentación.</p>
          </section>
        )}
        {porEliminar && (
          <ConfirmarEliminacion
            nombreCompleto={porEliminar.nombre + ' ' + porEliminar.apellido}
            error={error}
            onConfirmar={eliminarTarjeta}
            onCancelar={() => { setPorEliminar(null); setError('') }}
          />
        )}
      </div>
    </StudioLayout>
  )
}

export default App
