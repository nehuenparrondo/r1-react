# Correcciones de los ejercicios 1 y 2

## Saludo con botón

El botón Cambiar estilo recorre Esencial, Editorial, Terminal, Contorno y Cartel. useState guarda el índice; las clases de CSS modifican fuente, color, fondo, bordes y composición. No depende de pasar el cursor ni utiliza temporizadores.

Archivos: [App](../Proyecto1/src/App.tsx), [HelloWorld](../Proyecto1/src/components/helloWorld/helloWorld.tsx) y [CSS del saludo](../Proyecto1/src/components/helloWorld/helloWorld.css).

## Tarjeta por props y operaciones

App conserva el perfil confirmado. Tarjeta recibe nombre, apellido, profesión, imagen y callbacks mediante props. TarjetaForm mantiene el borrador y lo valida antes de pedir el guardado. Cancelar edición descarta el borrador. Nombre y apellido admiten hasta 60 caracteres cada uno; profesión, hasta 100. No se aceptan campos vacíos o compuestos solo por espacios. La foto original continúa siendo una prop y no se edita en este formulario.

El guardado usa localStorage, clave r1-tarjeta-personal. Se recuerda tanto la edición como la eliminación. Eliminar abre un diálogo del sitio: Cancelar y Escape conservan los datos; confirmar guarda null y muestra la opción Crear nueva tarjeta. Un fallo de almacenamiento se informa dentro de la página, sin fingir que se completó la operación. No hay backend, base SQL, alert, confirm ni prompt.

Archivos modificados o agregados:

- [App](../Proyecto2/src/App.tsx): estado, props y operaciones.
- [Tarjeta](../Proyecto2/src/components/tarjeta.tsx): presentación y botones.
- [TarjetaForm](../Proyecto2/src/components/TarjetaForm.tsx): borrador y validaciones.
- [ConfirmarEliminacion](../Proyecto2/src/components/ConfirmarEliminacion.tsx): diálogo accesible.
- [tarjetaStorage](../Proyecto2/src/services/tarjetaStorage.ts): lectura y escritura local.
- [DatosTarjeta](../Proyecto2/src/types/tarjeta.ts): contrato de datos.
- [CSS de la tarjeta](../Proyecto2/src/components/tarjeta.css): formulario, acciones y diálogo.

También se actualizaron README, la guía de lectura y el mapa de funciones de R1. Los otros tres ejercicios no se modificaron.

## Comprobaciones

- Proyecto1 y Proyecto2: npm run build y npm run lint correctos.
- 24 comprobaciones de lógica con almacenamiento simulado: ciclo de estilos, props, validación, borrador, cancelar, persistir, confirmar eliminación, recrear y manejar fallos de escritura/datos inválidos.
- Navegador: cinco estilos CSS efectivos y retorno al primero; formulario inválido, guardar, recargar y recuperar la tarjeta; diálogo real, foco inicial en Cancelar, cancelación por botón y Escape.
- Las pruebas de edición del navegador se hicieron en un origen separado (puerto 5272) con datos ficticios. La eliminación confirmada se verificó con almacenamiento simulado, sin borrar la tarjeta del usuario.
- Revisión visual de saludo, formulario y confirmación. La herramienta de navegador informó un ancho real de 605 píxeles durante la comprobación de desbordamiento; no se presenta como una validación real a 320 píxeles.

El código no se subió a GitHub en esta corrección. Los datos guardados se limitan al navegador y origen utilizados.
