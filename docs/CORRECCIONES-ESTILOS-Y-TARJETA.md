# Correcciones de los ejercicios 1, 2 y 3

## Saludo con botón

El botón Cambiar estilo recorre Esencial, Editorial, Terminal, Contorno y Cartel. useState guarda el índice; las clases de CSS modifican fuente, color, fondo, bordes y composición. No depende de pasar el cursor ni utiliza temporizadores.

Archivos: [App](../Proyecto1/src/App.tsx), [HelloWorld](../Proyecto1/src/components/helloWorld/helloWorld.tsx) y [CSS del saludo](../Proyecto1/src/components/helloWorld/helloWorld.css).

## Tarjeta por props y operaciones

App conserva una lista de perfiles con identificador. Agregar nueva tarjeta abre un
formulario vacío. Guardar añade el nuevo perfil y conserva los anteriores. Editar
actualiza solo la tarjeta elegida. Los datos y acciones llegan a Tarjeta mediante props.
Cancelar descarta el borrador. Nombre y apellido admiten 60 caracteres y profesión 100.

El guardado usa localStorage, clave r1-tarjeta-personal. Se guarda la colección completa.
La lectura conserva el perfil individual de la versión anterior y entiende su null como
colección vacía. La eliminación usa un diálogo del sitio y afecta solo a la tarjeta
seleccionada. Los errores de almacenamiento mantienen los datos confirmados.

Archivos modificados o agregados:

- [App](../Proyecto2/src/App.tsx): estado, props y operaciones.
- [Tarjeta](../Proyecto2/src/components/tarjeta.tsx): presentación y botones.
- [TarjetaForm](../Proyecto2/src/components/TarjetaForm.tsx): borrador y validaciones.
- [ConfirmarEliminacion](../Proyecto2/src/components/ConfirmarEliminacion.tsx): diálogo accesible.
- [tarjetaStorage](../Proyecto2/src/services/tarjetaStorage.ts): lectura y escritura local.
- [DatosTarjeta](../Proyecto2/src/types/tarjeta.ts): contrato de datos.
- [CSS de la tarjeta](../Proyecto2/src/components/tarjeta.css): formulario, acciones y diálogo.

## Restablecer el contador

Proyecto3/src/components/counter/Counter.tsx incluye Restablecer a 0, que llama
a setCount(0). El estilo del botón está en Counter.css. Funciona también con negativos.

## Comprobaciones de la primera revisión de estilos y tarjeta

Este apartado conserva las verificaciones de esa revisión anterior. Los comandos
y resultados de la revisión actual se registran por separado en la
[guía de los cinco ejercicios](LEER-EL-CODIGO.md).

- Proyecto1 y Proyecto2: npm run build y npm run lint correctos.
- 24 comprobaciones de lógica con almacenamiento simulado: ciclo de estilos, props, validación, borrador, cancelar, persistir, confirmar eliminación, recrear y manejar fallos de escritura/datos inválidos.
- Navegador: cinco estilos CSS efectivos y retorno al primero; formulario inválido, guardar, recargar y recuperar la tarjeta; diálogo real, foco inicial en Cancelar, cancelación por botón y Escape.
- Las pruebas de edición del navegador se hicieron en un origen separado (puerto 5272) con datos ficticios. La eliminación confirmada se verificó con almacenamiento simulado, sin borrar la tarjeta del usuario.
- Revisión visual de saludo, formulario y confirmación. La herramienta de navegador informó un ancho real de 605 píxeles durante la comprobación de desbordamiento; no se presenta como una validación real a 320 píxeles.

## Revisión de varias tarjetas y contador

Proyecto2 incluye siete pruebas automatizadas con npm test para la migración del
formato anterior, persistencia, creación sin reemplazar perfiles, edición/eliminación
individuales, cancelación, errores de almacenamiento y contador positivo/negativo.
Las comprobaciones de eliminación utilizan almacenamiento simulado.
Los datos guardados pertenecen al navegador y al origen utilizados.
