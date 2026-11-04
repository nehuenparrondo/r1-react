import { useEffect, useRef } from 'react'

type ConfirmarEliminacionProps = {
  nombreCompleto: string
  error: string
  onConfirmar: () => void
  onCancelar: () => void
}

/** Diálogo accesible del sitio: no usa alert ni confirm, y Escape permite cancelar. */
function ConfirmarEliminacion({ nombreCompleto, error, onConfirmar, onCancelar }: ConfirmarEliminacionProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
    cancelRef.current?.focus()
    return () => dialog?.close()
  }, [])

  return (
    <dialog className="tarjeta-dialog" ref={dialogRef} aria-labelledby="eliminar-tarjeta-title" aria-describedby="eliminar-tarjeta-description" onCancel={(event) => { event.preventDefault(); onCancelar() }}>
      <span className="tarjeta-dialog__icon" aria-hidden="true">×</span>
      <h2 id="eliminar-tarjeta-title">¿Seguro que querés eliminar la tarjeta?</h2>
      <p id="eliminar-tarjeta-description">Se eliminarán los datos guardados de <strong>{nombreCompleto}</strong> en este navegador. Después podés crear una nueva tarjeta.</p>
      {error && <p className="tarjeta-feedback tarjeta-feedback--error" role="alert">{error}</p>}
      <div className="tarjeta-actions">
        <button className="tarjeta-button" type="button" ref={cancelRef} onClick={onCancelar}>Cancelar</button>
        <button className="tarjeta-button tarjeta-button--danger" type="button" onClick={onConfirmar}>Sí, eliminar tarjeta</button>
      </div>
    </dialog>
  )
}

export default ConfirmarEliminacion
