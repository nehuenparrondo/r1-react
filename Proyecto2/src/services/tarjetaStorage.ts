import type { DatosTarjeta, TarjetaGuardada } from '../types/tarjeta'

const CLAVE_TARJETA = 'r1-tarjeta-personal'

/** Valida los tres textos antes de confiar en un JSON persistido o migrar el formato viejo. */
function esDatosTarjeta(datos: unknown): datos is DatosTarjeta {
  return typeof datos === 'object' && datos !== null
    && 'nombre' in datos && typeof datos.nombre === 'string'
    && Boolean(datos.nombre.trim()) && datos.nombre.length <= 60
    && 'apellido' in datos && typeof datos.apellido === 'string'
    && Boolean(datos.apellido.trim()) && datos.apellido.length <= 60
    && 'profesion' in datos && typeof datos.profesion === 'string'
    && Boolean(datos.profesion.trim()) && datos.profesion.length <= 100
}

/** Admite el formato anterior de una tarjeta y el nuevo listado con identificadores. */
export function cargarTarjetas(datosIniciales: DatosTarjeta): TarjetaGuardada[] {
  const iniciales = [{ ...datosIniciales, id: 'tarjeta-inicial' }]
  try {
    const guardado = localStorage.getItem(CLAVE_TARJETA)
    if (guardado === null) return iniciales
    const datos: unknown = JSON.parse(guardado)
    // null era la eliminación guardada en la versión anterior.
    if (datos === null) return []
    if (esDatosTarjeta(datos)) return [{ ...datos, id: 'tarjeta-inicial' }]
    if (!Array.isArray(datos)) return iniciales
    // Un ID repetido haría ambiguo editar o borrar. Se valida la lista completa.
    const identificadores = new Set<string>()
    for (const tarjeta of datos) {
      if (!esDatosTarjeta(tarjeta) || !('id' in tarjeta)
        || typeof tarjeta.id !== 'string' || !tarjeta.id.trim()
        || identificadores.has(tarjeta.id)) return iniciales
      identificadores.add(tarjeta.id)
    }
    return datos
  } catch {
    return iniciales
  }
}

/** Guardar primero permite informar un fallo sin modificar las tarjetas confirmadas. */
export function guardarTarjetas(tarjetas: TarjetaGuardada[]) {
  localStorage.setItem(CLAVE_TARJETA, JSON.stringify(tarjetas))
}
