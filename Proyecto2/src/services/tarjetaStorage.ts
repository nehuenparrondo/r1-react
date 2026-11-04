import type { DatosTarjeta } from '../types/tarjeta'

const CLAVE_TARJETA = 'r1-tarjeta-personal'

/** null representa una eliminación guardada; una clave ausente usa los datos iniciales. */
export function cargarTarjeta(datosIniciales: DatosTarjeta): DatosTarjeta | null {
  try {
    const guardado = localStorage.getItem(CLAVE_TARJETA)
    if (guardado === null) return datosIniciales
    const datos: unknown = JSON.parse(guardado)
    if (datos === null) return null
    if (typeof datos !== 'object') return datosIniciales
    if ('nombre' in datos && typeof datos.nombre === 'string' && datos.nombre.trim() && datos.nombre.length <= 60
      && 'apellido' in datos && typeof datos.apellido === 'string' && datos.apellido.trim() && datos.apellido.length <= 60
      && 'profesion' in datos && typeof datos.profesion === 'string' && datos.profesion.trim() && datos.profesion.length <= 100) {
      return { nombre: datos.nombre, apellido: datos.apellido, profesion: datos.profesion }
    }
  } catch {
    return datosIniciales
  }
  return datosIniciales
}

/** Un fallo se propaga al padre para mostrar un mensaje, sin afirmar que se guardó. */
export function guardarTarjeta(datos: DatosTarjeta | null) {
  localStorage.setItem(CLAVE_TARJETA, JSON.stringify(datos))
}
