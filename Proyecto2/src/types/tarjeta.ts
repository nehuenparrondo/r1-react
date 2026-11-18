/** Datos editables compartidos mediante props entre el padre, la tarjeta y el formulario. */
export type DatosTarjeta = {
  nombre: string
  apellido: string
  profesion: string
}

/** El identificador permite editar o eliminar una tarjeta sin confundir las demás. */
export type TarjetaGuardada = DatosTarjeta & { id: string }
