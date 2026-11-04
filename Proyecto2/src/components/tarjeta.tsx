/**
 * Los datos y acciones llegan por props. App administra el estado y el guardado;
 * esta tarjeta presenta el perfil y comunica las pulsaciones al padre.
 */

import type { DatosTarjeta } from '../types/tarjeta'
import './tarjeta.css'

type TarjetaProps = DatosTarjeta & {
  imagen: string
  onEditar: () => void
  onEliminar: () => void
  editando: boolean
}

function Tarjeta({ nombre, apellido, profesion, imagen, onEditar, onEliminar, editando }: TarjetaProps) {
  const nombreCompleto = `${nombre} ${apellido}`

  return (
    <article className="tarjeta" aria-label={`Perfil de ${nombreCompleto}`}>
      <div className="tarjeta__cover"><span>Un perfil con identidad</span><span aria-hidden="true">↗</span></div>
      <div className="tarjeta__body">
        <img className="tarjeta__imagen" src={imagen} alt={`Retrato de ${nombreCompleto}`} />
        <span className="tarjeta__etiqueta">Perfil personal</span>
        <h2 className="tarjeta__nombre">{nombreCompleto}</h2>
        <p className="tarjeta__profesion">{profesion}</p>
        <div className="tarjeta-actions tarjeta-actions--profile">
          <button className="tarjeta-button tarjeta-button--primary" type="button" onClick={onEditar} disabled={editando}>Editar tarjeta</button>
          <button className="tarjeta-button tarjeta-button--danger" type="button" onClick={onEliminar} disabled={editando}>Eliminar tarjeta</button>
        </div>
        <div className="tarjeta__footer"><span>La actitud también es una habilidad.</span><span aria-hidden="true">✳</span></div>
      </div>
    </article>
  )
}

export default Tarjeta
