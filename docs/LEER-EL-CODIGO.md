# R1 · Guía completa de los cinco ejercicios

Revisión del código del 16 de noviembre de 2026.

Esta carpeta reúne cinco aplicaciones de React, TypeScript y Vite. Cada Proyecto
tiene su propio package.json y se ejecuta de forma independiente. Para explicarlo
en clase conviene abrir primero src/main.tsx, después src/App.tsx y finalmente el
componente que implementa el ejercicio.

## 1. Cómo está organizado

| Carpeta | Pantalla | Responsabilidad principal |
| --- | --- | --- |
| Proyecto1 | Hola mundo | Cambiar cinco estilos CSS mediante estado. |
| Proyecto2 | Tarjetas personales | Agregar, editar, guardar y eliminar perfiles por ID. |
| Proyecto3 | Contador | Sumar, restar y volver a cero. |
| Proyecto4 | Gestor de tareas | Alta, edición, estados, fechas, atajos y respaldos. |
| Proyecto5 | Saludo personalizado | Validar un nombre y generar un saludo según la hora. |

En cada src, components contiene piezas de interfaz, types describe los datos y
utils o services agrupa operaciones reutilizables. main.tsx monta React en el
elemento raíz del HTML. App.tsx compone la pantalla. Los estilos viven en CSS.
Los directorios node_modules y dist son dependencias y resultados de compilación.
Las carpetas src con fechas son respaldos históricos. El código activo está en src.

StudioLayout compone cabecera, título, contenido, pie y selector de tema. Sus props
number, label, title, description y note permiten reutilizar la misma estructura.
Las copias de este componente pertenecen a aplicaciones independientes.

## 2. Estado, props y almacenamiento

| Concepto | Qué significa aquí | Ejemplo |
| --- | --- | --- |
| useState | Dato que React conserva mientras el componente está montado. | Valor del contador o formulario de una tarjeta. |
| Props | Datos y callbacks que el padre entrega al hijo. | App entrega nombre y onEditar a Tarjeta. |
| Context | Estado compartido por varias pantallas descendientes. | TaskProvider distribuye las tareas. |
| useRef | Referencia estable que no provoca un render por sí sola. | Lista vigente de tareas o elemento dialog. |
| localStorage | Textos persistidos por navegador y origen. | Colección de tarjetas y tareas. |
| JSON.stringify / JSON.parse | Conversión entre objetos de JavaScript y texto. | Guardar y recuperar una colección. |

Cambiar un estado vuelve a representar la interfaz. Persistir significa ejecutar
además una escritura en almacenamiento. El contador y el índice del saludo se
reinician al recargar. Las tarjetas, tareas y preferencias guardadas pueden restaurarse.

Cada origen incluye protocolo, host y puerto. Los datos de 127.0.0.1:5182 pertenecen
a ese origen. Abrir el proyecto en otro puerto o navegador puede mostrar datos distintos.

## 3. Ejercicio 1 · Hola mundo con estilos

La entrada visual está en [HelloWorld](../Proyecto1/src/components/helloWorld/helloWorld.tsx#L13).
ESTILOS define Esencial, Editorial, Terminal, Contorno y Cartel. Cada entrada tiene
clase, nombre y descripción.

El recorrido del botón es el siguiente.

1. useState inicia indiceEstilo en 0.
2. Cambiar estilo ejecuta [cambiarEstilo](../Proyecto1/src/components/helloWorld/helloWorld.tsx#L18).
3. La operación (actual + 1) % ESTILOS.length recorre la lista y vuelve al principio.
4. React actualiza la clase hello--esencial, hello--editorial u otra variante.
5. helloWorld.css aplica tipografía, color, fondo, bordes y composición.

La apariencia se modifica con CSS. El estado guarda el índice elegido. El texto del
estilo tiene una región aria-live para anunciar el cambio. El selector de tema
es una operación independiente y utiliza su propio almacenamiento.

## 4. Ejercicio 2 · Varias tarjetas por props

### Datos y responsables

[DatosTarjeta](../Proyecto2/src/types/tarjeta.ts) define nombre, apellido y profesion.
TarjetaGuardada añade id. Este identificador permite distinguir perfiles aunque
tengan nombres iguales.

[App](../Proyecto2/src/App.tsx#L17) conserva la lista de tarjetas, el editor abierto, la
tarjeta pendiente de eliminación y los mensajes. [Tarjeta](../Proyecto2/src/components/tarjeta.tsx#L16)
recibe el perfil y sus callbacks por props. Presenta los datos y comunica pulsaciones.
La imagen de ejemplo llega también por props y es común a las tarjetas.

| Acción | Recorrido en el código | Qué queda guardado |
| --- | --- | --- |
| Agregar nueva tarjeta | abrirEditor sin argumento abre TarjetaForm con campos vacíos. | Todavía no escribe nada. |
| Guardar un alta | TarjetaForm valida y llama a guardarDatos. | Se agrega un perfil con crypto.randomUUID. |
| Editar | abrirEditor recibe la tarjeta y conserva su ID. | El borrador se mantiene separado. |
| Guardar edición | guardarDatos reemplaza solo el ID elegido mediante map. | Se escribe la nueva colección. |
| Cancelar edición | Se cierra el editor y se descarta el borrador. | Los perfiles confirmados se conservan. |
| Eliminar | El botón abre ConfirmarEliminacion. | Solo se escribe al confirmar. |

[enviarFormulario](../Proyecto2/src/components/TarjetaForm.tsx#L16) recorta los
extremos de los textos. Exige los tres campos, nombre y apellido de hasta 60
caracteres y profesión de hasta 100. El formulario es controlado mediante value
y onChange. Los errores aparecen dentro de la página.

### Guardado y compatibilidad

[guardarTarjetas](../Proyecto2/src/services/tarjetaStorage.ts#L42) convierte la
lista a JSON y la guarda en la clave r1-tarjeta-personal.

    [
      {
        "id": "identificador-del-perfil",
        "nombre": "Ana",
        "apellido": "Pérez",
        "profesion": "Docente"
      }
    ]

[cargarTarjetas](../Proyecto2/src/services/tarjetaStorage.ts#L17) admite estos casos.

| Dato encontrado | Resultado |
| --- | --- |
| Clave ausente | Muestra el perfil inicial. |
| Objeto de la versión anterior | Lo convierte en una lista con ID y conserva sus textos. |
| null de la versión anterior | Conserva la eliminación como lista vacía. |
| Lista válida | Restaura todos los perfiles. |
| Lista vacía | Mantiene la colección vacía al recargar. |
| JSON inválido, campos incorrectos o IDs repetidos | Recupera el perfil inicial. |

[guardarDatos](../Proyecto2/src/App.tsx#L35) escribe primero el almacenamiento
y después actualiza React. Si falla la escritura, conserva los perfiles confirmados
y mantiene abierto el formulario para reintentar.

[ConfirmarEliminacion](../Proyecto2/src/components/ConfirmarEliminacion.tsx#L11)
utiliza un elemento HTML dialog y showModal. Enfoca Cancelar al abrirse. Cancelar o
Escape cierran la pregunta. Confirmar llama a [eliminarTarjeta](../Proyecto2/src/App.tsx#L52),
que filtra únicamente el ID seleccionado. Es una ventana propia de la aplicación.

## 5. Ejercicio 3 · Contador

[Counter](../Proyecto3/src/components/counter/Counter.tsx#L10) conserva count con useState(0).
Sumar y Restar usan actualizaciones funcionales para calcular el nuevo valor desde
el anterior. Restablecer a 0 ejecuta setCount(0) y funciona desde positivos o negativos.
React actualiza el output, que anuncia el valor mediante aria-live.

Counter.css define los botones y la presentación numérica. El valor pertenece al
estado local y vuelve a cero al recargar.

## 6. Ejercicio 4 · Tareas

### Pantallas y datos

[App del gestor](../Proyecto4/src/App.tsx#L16) reúne las rutas y TaskProvider.

| Ruta | Pantalla |
| --- | --- |
| / | HomePage muestra el tablero, resúmenes y grupos por estado. |
| /tareas/nueva | CreateTaskPage reúne los campos y los atajos. |
| /tareas/:taskId | TaskDetailPage consulta una tarea por ID. |
| /tareas/:taskId/editar | EditTaskPage permite modificar una tarea editable. |
| Ruta desconocida | NotFoundPage ofrece volver al tablero. |

El modelo Task contiene id, title, description, createdAt, dueDate y status.
NewTask contiene los campos que completa la persona. El proveedor genera los
campos de sistema. QuickTask guarda una plantilla reutilizable.

### Crear y evitar duplicados

CreateTaskPage mantiene el borrador y llama a [addTask](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L106).
Este método recorta el título, exige entre 1 y 80 caracteres y comprueba que el
título normalizado no exista. Asigna un UUID, la fecha ISO de creación y el estado pending.
Una descripción vacía se transforma en Sin descripción.

[normalizeTitle](../Proyecto4/src/utils/normalizeTitle.ts#L12) elimina marcas
de acentos, unifica espacios y compara en minúsculas. Por eso Estudiar, ESTUDIAR y
un título con espacios exteriores representan la misma tarea. Una tarea completada
también reserva su título mientras exista en la lista.

### Estado, edición y eliminación

[updateTaskStatus](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L132)
actualiza la tarea por ID. Los estados admitidos por el contrato son pending,
in-progress y completed. HomePage filtra la colección para construir cada grupo
y sus cantidades. Elegir un estado cambia el dato, y React vuelve a agruparlo.

[updateTask](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L142) rechaza una
tarea inexistente, completada o con título repetido. [deleteTask](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L194)
elimina únicamente tareas completadas. clearCompletedTasks conserva las restantes.
DeleteTaskButton solicita confirmación antes de ejecutar la acción correspondiente.

### Persistencia, fechas, atajos y respaldos

saveTasks guarda la colección en lista-de-tareas. saveQuickTasks usa tareas-rapidas.
Las referencias tasksRef y quickTasksRef se actualizan inmediatamente para que
dos acciones consecutivas validen contra la colección vigente.

dueDate se guarda como texto de fecha o cadena vacía. formatDate.ts la presenta y
comprueba vencimientos. Al cargar datos antiguos, loadTasks convierte completed
al estado equivalente y completa campos que la versión anterior no tenía.

addQuickTask crea una plantilla solo para tareas sin fecha y rechaza títulos
normalizados repetidos. Quitar la plantilla conserva las tareas creadas a partir de ella.

TaskDataControls permite descargar o cargar un respaldo. createTaskBackup arma
format, version, exportedAt, tasks y quickTasks. parseTaskBackup valida estructura,
fechas reales, campos, estados, IDs y títulos únicos antes del reemplazo.
La descarga crea un archivo. El guardado habitual sigue siendo localStorage.

La importación escribe las dos claves por separado. localStorage no ofrece una
transacción conjunta entre ellas. La lectura normal de tareas antiguas también
tiene menos validaciones que la importación de un respaldo.

## 7. Ejercicio 5 · Nombre y saludo

[FormularioSaludo](../Proyecto5/src/components/FormularioSaludo/FormularioSaludo.tsx#L23)
separa nombre, saludo y error. actualizarNombre comprueba los caracteres mientras
se escribe y rechaza la edición completa si contiene números o signos.

[isValidName](../Proyecto5/src/utils/validateName.ts#L22) normaliza NFC, recorta
extremos y exige entre 2 y 50 caracteres. El alfabeto permitido incluye letras
latinas, vocales acentuadas, ñ, ü y espacios comunes.

Al enviar, el formulario valida nuevamente, unifica espacios y usa obtenerSaludo
con la hora local del dispositivo. De 5 a antes de 13 muestra Buen día, de 13 a
antes de 19 Buenas tardes y el resto Buenas noches. Editar el nombre limpia el
saludo anterior. Los datos de este formulario viven en memoria.

## 8. Ejecutar y revisar

Desde la carpeta de cada Proyecto instalar con npm ci. Abrir una terminal por
ejercicio y usar un puerto distinto. Ejemplo desde Proyecto2.

    npm run dev -- --host 127.0.0.1 --port 5182 --strictPort

Para la presentación actual se usan 5181 a 5185. Los puertos se pasan al comando,
por lo que pueden elegirse otros disponibles. Desde cada proyecto ejecutar npm run
lint y npm run build. Proyecto2 añade npm test para las tarjetas y el reinicio del contador.

Prueba manual sugerida por ejercicio.

1. Recorrer los cinco estilos y comprobar el regreso al primero.
2. Agregar dos tarjetas, editar una, cancelar otra edición y recargar.
3. Sumar, restar y restablecer positivos y negativos a cero.
4. Crear una tarea, intentar repetir su título, cambiar de estado y revisar el detalle.
5. Probar Ana María, un nombre vacío, Ana123 y comas.

## 9. Preguntas que puede hacer el profesor

| Pregunta | Respuesta y lugar para mostrar |
| --- | --- |
| ¿Dónde está la base de datos? | Estos ejercicios usan estado y almacenamiento del navegador. Mostrar tarjetaStorage o saveTasks. |
| ¿Dónde se pasan props? | App de Proyecto2 al renderizar Tarjeta y TarjetaForm. |
| ¿Cómo se agrega otra tarjeta? | abrirEditor abre el alta y guardarDatos añade un objeto con UUID. |
| ¿Qué hace map? | Construye la colección editada conservando las tarjetas con otro ID. |
| ¿Qué hace filter? | Construye la colección que excluye la tarjeta elegida. |
| ¿Por qué editar no guarda de inmediato? | El formulario tiene un borrador separado de los datos confirmados. |
| ¿Dónde se bloquea una tarea duplicada? | addTask y updateTask en TaskProvider, usando normalizeTitle. |
| ¿Dónde se muestran pendientes? | HomePage filtra por status pending. |
| ¿Qué reinicia el contador? | El botón llama a setCount(0). |
| ¿Cómo rechaza signos en el nombre? | isAllowedNameInput al escribir e isValidName al enviar. |

Para encontrar cualquier símbolo y sus líneas actuales, consultar
[el mapa de archivos y funciones](MAPA-ARCHIVOS-Y-FUNCIONES.md).

## 10. Verificación de esta revisión

Se ejecutaron npm run lint y npm run build en los cinco proyectos: los diez
comandos terminaron correctamente. npm test en Proyecto2 pasó sus siete pruebas,
incluidas varias tarjetas, migración del guardado anterior y reinicio del contador.

El mapa reúne 123 archivos y enlaza 107 funciones o componentes declarados.
Se revisaron los recorridos de las cinco pantallas y sus reglas de persistencia
contra el código. La comparación del código ejecutable antes y después confirma
que esta revisión de documentación conserva su comportamiento.

Los archivos de lectura actualizados son README.md, esta guía,
MAPA-ARCHIVOS-Y-FUNCIONES.md y CORRECCIONES-ESTILOS-Y-TARJETA.md. Los comentarios
del código explican estado, borradores, operaciones por ID, confirmación y guardado.
La prueba visual sugerida en el apartado 8 es el recorrido para la presentación;
los comandos anteriores son las comprobaciones automatizadas de esta revisión.
