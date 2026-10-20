import './tarjeta.css'

type TarjetaProps = {
  nombre: string
  apellido: string
  profesion: string
  imagen: string
}

function Tarjeta({ nombre, apellido, profesion, imagen }: TarjetaProps) {
  const nombreCompleto = `${nombre} ${apellido}`

  return (
    <article className="tarjeta" aria-label={`Perfil de ${nombreCompleto}`}>
      <div className="tarjeta__cover"><span>Un perfil con identidad</span><span aria-hidden="true">↗</span></div>
      <div className="tarjeta__body">
        <img className="tarjeta__imagen" src={imagen} alt={`Retrato de ${nombreCompleto}`} />
        <span className="tarjeta__etiqueta">Perfil personal</span>
        <h2 className="tarjeta__nombre">{nombreCompleto}</h2>
        <p className="tarjeta__profesion">{profesion}</p>
        <div className="tarjeta__footer"><span>La actitud también es una habilidad.</span><span aria-hidden="true">✳</span></div>
      </div>
    </article>
  )
}

export default Tarjeta
