# Consigna 1 · Entender los cinco ejercicios de React

## Por dónde empezar

Cada carpeta Proyecto1 a Proyecto5 es una aplicación independiente. Abrí primero su src/main.tsx (monta React), después src/App.tsx (elige el contenido) y finalmente el componente del ejercicio. No hay un backend oculto ni una base SQL.

| Ejercicio | Archivo principal | Qué demuestra |
| --- | --- | --- |
| 1 | Proyecto1/src/components/helloWorld/helloWorld.tsx | Un botón cambia el índice del estado y la clase CSS de todo el saludo. |
| 2 | Proyecto2/src/App.tsx y components/tarjeta.tsx | El padre conserva el perfil, la tarjeta lo recibe por props y el formulario permite editarlo. |
| 3 | Proyecto3/src/components/counter/Counter.tsx | Un botón cambia el contador y React vuelve a dibujar el número. |
| 4 | Proyecto4/src/context/TaskContext/TaskProvider.tsx | Una lista compartida entre pantallas, con guardado local y validaciones centrales. |
| 5 | Proyecto5/src/components/FormularioSaludo/FormularioSaludo.tsx | Un formulario controlado valida el nombre y confirma un saludo. |

## Qué cambia y qué se conserva

- Estado local (useState): pertenece al componente. El contador y el borrador del formulario no son una cuenta registrada y se reinician al recargar.
- Props: datos y funciones que un componente recibe del que lo utiliza. No son una copia automática en el disco.
- Efecto (useEffect): sincroniza con algo externo a la representación de React, como la preferencia de tema o la apertura del diálogo de eliminación.
- Referencia (useRef): conserva un valor entre renders sin volver a dibujar. Permite abrir/cerrar el diálogo y enfocar Cancelar; en tareas, conserva la lista vigente para evitar envíos consecutivos duplicados.

## Recorrido del saludo (ejercicio 1)

HelloWorld conserva indiceEstilo con useState. El botón llama a cambiarEstilo, que avanza con (actual + 1) % ESTILOS.length y vuelve al comienzo después del quinto estilo. La clase hello--esencial, hello--editorial, hello--terminal, hello--contorno o hello--cartel activa reglas de helloWorld.css. No hay temporizadores ni cambios automáticos al pasar el cursor. El estilo elegido se reinicia al recargar.

## Recorrido de la tarjeta (ejercicio 2)

App lee cargarTarjeta y conserva los datos confirmados. Tarjeta recibe nombre, apellido, profesión, imagen y callbacks mediante props; no escribe directamente en el almacenamiento. Editar tarjeta abre TarjetaForm con un borrador. Guardar valida campos no vacíos y límites, llama a guardarDatos en App y después actualiza la tarjeta. Cancelar edición descarta el borrador.

services/tarjetaStorage.ts guarda nombre, apellido y profesión como JSON en localStorage, clave r1-tarjeta-personal. Una clave ausente muestra el perfil inicial; el texto JSON null representa una eliminación guardada y evita que reaparezca al recargar. No es una base SQL ni un archivo JSON descargado.

Eliminar tarjeta abre ConfirmarEliminacion, un elemento dialog personalizado con showModal. Cancelar o Escape no eliminan. Sí, eliminar tarjeta llama al padre, guarda null y muestra un estado vacío con Crear nueva tarjeta. No se usa alert ni confirm. La imagen original llega por props y no tiene edición en este ejercicio.

## Recorrido de una tarea (ejercicio 4)

CreateTaskPage toma título/descripción/fecha → llama a addTask → TaskProvider valida duplicados → crea ID, fecha de creación y estado pendiente → saveTasks escribe texto JSON en localStorage y actualiza el estado visible.

El nombre de la clave es lista-de-tareas. Los atajos usan tareas-rapidas. JSON.stringify convierte objetos a texto; JSON.parse los reconstruye al iniciar. localStorage es del navegador y del origen (protocolo, host y puerto): otro navegador o puerto no tiene necesariamente la misma lista. No se crea un archivo JSON dentro de src.

TaskDataControls ofrece un respaldo manual: Descargar crea un archivo; Cargar lo lee y valida mediante utils/taskBackup.ts antes de reemplazar las listas. La validación no acepta cualquier JSON, aunque esté bien escrito. El contexto comprueba duplicados también al editar, usar atajos e importar.

## Recorrido del nombre (ejercicio 5)

actualizarNombre controla el borrador → isAllowedNameInput filtra letras y espacios comunes → enviarFormulario vuelve a comprobar con isValidName → se confirma el saludo. Se admiten los acentos previstos, ñ y ü; no números, comas, guiones o apóstrofos. La validación final exige entre 2 y 50 caracteres.

## Qué tocar según el cambio

| Quiero cambiar… | Mirar primero |
| --- | --- |
| Apariencia de una pantalla | Su CSS y el componente que lo importa. |
| Datos de la tarjeta | App.tsx, TarjetaForm.tsx y las props de Tarjeta. |
| Guardado y eliminación de la tarjeta | services/tarjetaStorage.ts y ConfirmarEliminacion.tsx. |
| Reglas de títulos repetidos | normalizeTitle.ts y TaskProvider.tsx, no solo el formulario. |
| Formato del archivo descargado | taskBackup.ts y TaskDataControls.tsx. |
| Caracteres válidos del nombre | validateName.ts. |

## Ejecutar y comprobar

Dentro de cada Proyecto: npm ci, npm run dev. Para verificar: npm run build y npm run lint. No existe una suite npm test propia. Las carpetas src con fechas son respaldos históricos: no son el código activo documentado.

**Para explicar al profesor:** “Cada ejercicio ilustra una parte de React. La tarjeta usa props y callbacks, y conserva cambios en el navegador; el gestor de tareas también tiene persistencia local. Ninguno utiliza una base SQL”.

## Encontrar una función en el editor

En el archivo de código, los bloques de comentario explican responsabilidades, entradas/salidas y efectos importantes. Buscar el nombre con Ctrl+F permite encontrar la función; después usar Buscar referencias para ver quién la llama. El mapa siguiente incluye enlaces a los archivos reales y a las líneas vigentes al documentar.

[Mapa de archivos y funciones](MAPA-ARCHIVOS-Y-FUNCIONES.md).

Documentación en español del código activo, actualizada al incorporar el botón de estilos y las operaciones de la tarjeta. No se agregaron dependencias ni se modificaron secretos o datos de los otros ejercicios. Los respaldos con fechas, node_modules, compilaciones y archivos privados no son el código activo documentado.
