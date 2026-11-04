# R1 · Mapa del código activo

[Empezar por la explicación sencilla](LEER-EL-CODIGO.md). Este índice ayuda a ubicar piezas; no hace falta leerlo de principio a fin. Las líneas corresponden a esta revisión y pueden desplazarse si se edita el archivo.

## Proyecto1

### [Proyecto1/eslint.config.js](../Proyecto1/eslint.config.js)

Configuración del análisis estático de código. Define reglas y archivos revisados; no decide permisos de usuarios ni persistencia.

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.

### [Proyecto1/src/App.tsx](../Proyecto1/src/App.tsx)

Composición del ejercicio: conecta el marco visual con el componente que demuestra el concepto de React. Los datos por props y el estado local pertenecen al ejercicio; aquí no existe un backend.

**Se conecta con:** [Proyecto1/src/components/StudioLayout/StudioLayout.tsx](../Proyecto1/src/components/StudioLayout/StudioLayout.tsx), [Proyecto1/src/components/helloWorld/helloWorld.tsx](../Proyecto1/src/components/helloWorld/helloWorld.tsx).

**Funciones para buscar:**

- [`App` · línea 10](../Proyecto1/src/App.tsx#L10)

### [Proyecto1/src/components/helloWorld/helloWorld.tsx](../Proyecto1/src/components/helloWorld/helloWorld.tsx)

Saludo con cinco estilos CSS. El botón cambia el índice local y la clase del escenario; no hay temporizadores.

**Se conecta con:** [Proyecto1/src/components/helloWorld/helloWorld.css](../Proyecto1/src/components/helloWorld/helloWorld.css).

**Funciones para buscar:**

- [`HelloWorld` · línea 13](../Proyecto1/src/components/helloWorld/helloWorld.tsx#L13): Estado, estilo activo y composición del saludo.
- [`cambiarEstilo` · línea 17](../Proyecto1/src/components/helloWorld/helloWorld.tsx#L17): Avanza cíclicamente entre las cinco variantes.

### [Proyecto1/src/components/StudioLayout/StudioLayout.tsx](../Proyecto1/src/components/StudioLayout/StudioLayout.tsx)

Componente reutilizable StudioLayout. Sus props conectan contenido y acciones con el componente que lo usa; para seguir el dato, buscar sus importaciones y los callbacks recibidos en lugar de suponer que guarda directamente en una base.

**Se conecta con:** [Proyecto1/src/components/themeButton/themeButton.tsx](../Proyecto1/src/components/themeButton/themeButton.tsx), [Proyecto1/src/components/StudioLayout/StudioLayout.css](../Proyecto1/src/components/StudioLayout/StudioLayout.css).

**Funciones para buscar:**

- [`StudioLayout` · línea 21](../Proyecto1/src/components/StudioLayout/StudioLayout.tsx#L21)

### [Proyecto1/src/components/themeButton/themeButton.ts](../Proyecto1/src/components/themeButton/themeButton.ts)

Parte del sistema visual: comparte colores, tamaños o preferencia de tema según su implementación. La preferencia de apariencia es independiente de la autenticación y de los datos de las tareas.

**Funciones para buscar:**

- [`obtenerTemaInicial` · línea 11](../Proyecto1/src/components/themeButton/themeButton.ts#L11)
- [`useTema` · línea 16](../Proyecto1/src/components/themeButton/themeButton.ts#L16)

### [Proyecto1/src/components/themeButton/themeButton.tsx](../Proyecto1/src/components/themeButton/themeButton.tsx)

Parte del sistema visual: comparte colores, tamaños o preferencia de tema según su implementación. La preferencia de apariencia es independiente de la autenticación y de los datos de las tareas.

**Se conecta con:** [Proyecto1/src/components/themeButton/themeButton.css](../Proyecto1/src/components/themeButton/themeButton.css), [Proyecto1/src/components/themeButton/themeButton.ts](../Proyecto1/src/components/themeButton/themeButton.ts).

**Funciones para buscar:**

- [`ThemeButton` · línea 10](../Proyecto1/src/components/themeButton/themeButton.tsx#L10)

### [Proyecto1/src/main.tsx](../Proyecto1/src/main.tsx)

Punto de entrada del navegador: monta React sobre el elemento raíz del HTML e instala los proveedores/navegación declarados. No es un servidor Node.js ni una conexión a la base.

**Se conecta con:** [Proyecto1/src/index.css](../Proyecto1/src/index.css), [Proyecto1/src/App.tsx](../Proyecto1/src/App.tsx).

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.


### [Proyecto1/vite.config.ts](../Proyecto1/vite.config.ts)

Configuración de Vite para desarrollo/compilación del frontend. Revisar aquí plugins, servidor y proxy cuando estén definidos; no es el backend de cuentas.

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.

## Proyecto2

### [Proyecto2/eslint.config.js](../Proyecto2/eslint.config.js)

Configuración del análisis estático de código. Define reglas y archivos revisados; no decide permisos de usuarios ni persistencia.

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.

### [Proyecto2/src/App.tsx](../Proyecto2/src/App.tsx)

Composición del ejercicio: conecta el marco visual con el componente que demuestra el concepto de React. Los datos por props y el estado local pertenecen al ejercicio; aquí no existe un backend.

**Se conecta con:** [Proyecto2/src/assets/image.jpg](../Proyecto2/src/assets/image.jpg), [Proyecto2/src/components/tarjeta.tsx](../Proyecto2/src/components/tarjeta.tsx), [Proyecto2/src/components/StudioLayout/StudioLayout.tsx](../Proyecto2/src/components/StudioLayout/StudioLayout.tsx).

**Funciones para buscar:**

- [`App` · línea 14](../Proyecto2/src/App.tsx#L14): Conserva el perfil, pasa props y coordina edición, guardado y eliminación.
- [Formulario de borrador](../Proyecto2/src/components/TarjetaForm.tsx#L11): Valida nombre, apellido y profesión; Guardar comunica los datos al padre y Cancelar descarta los cambios.
- [Confirmación personalizada](../Proyecto2/src/components/ConfirmarEliminacion.tsx#L11): Diálogo con Cancelar, Escape y confirmación explícita; no usa alert ni confirm.
- [Persistencia](../Proyecto2/src/services/tarjetaStorage.ts#L6): Lee la tarjeta de localStorage; guardarTarjeta escribe datos o null cuando se elimina.
- [Tipo de datos](../Proyecto2/src/types/tarjeta.ts#L2): Contrato de nombre, apellido y profesión.

### [Proyecto2/src/components/StudioLayout/StudioLayout.tsx](../Proyecto2/src/components/StudioLayout/StudioLayout.tsx)

Componente reutilizable StudioLayout. Sus props conectan contenido y acciones con el componente que lo usa; para seguir el dato, buscar sus importaciones y los callbacks recibidos en lugar de suponer que guarda directamente en una base.

**Se conecta con:** [Proyecto2/src/components/themeButton/themeButton.tsx](../Proyecto2/src/components/themeButton/themeButton.tsx), [Proyecto2/src/components/StudioLayout/StudioLayout.css](../Proyecto2/src/components/StudioLayout/StudioLayout.css).

**Funciones para buscar:**

- [`StudioLayout` · línea 21](../Proyecto2/src/components/StudioLayout/StudioLayout.tsx#L21)

### [Proyecto2/src/components/tarjeta.tsx](../Proyecto2/src/components/tarjeta.tsx)

Ejercicio de props: recibe datos de una tarjeta y los presenta. No necesita consultar un backend para conocer el nombre, profesión o imagen.

**Se conecta con:** [Proyecto2/src/components/tarjeta.css](../Proyecto2/src/components/tarjeta.css).

**Funciones para buscar:**

- [`Tarjeta` · línea 16](../Proyecto2/src/components/tarjeta.tsx#L16): Recibe datos y callbacks por props; presenta el perfil y los botones de edición/eliminación.

### [Proyecto2/src/components/themeButton/themeButton.tsx](../Proyecto2/src/components/themeButton/themeButton.tsx)

Parte del sistema visual: comparte colores, tamaños o preferencia de tema según su implementación. La preferencia de apariencia es independiente de la autenticación y de los datos de las tareas.

**Se conecta con:** [Proyecto2/src/components/themeButton/themeButton.css](../Proyecto2/src/components/themeButton/themeButton.css), [Proyecto2/src/components/themeButton/useTema.ts](../Proyecto2/src/components/themeButton/useTema.ts).

**Funciones para buscar:**

- [`ThemeButton` · línea 10](../Proyecto2/src/components/themeButton/themeButton.tsx#L10)

### [Proyecto2/src/components/themeButton/useTema.ts](../Proyecto2/src/components/themeButton/useTema.ts)

Parte del sistema visual: comparte colores, tamaños o preferencia de tema según su implementación. La preferencia de apariencia es independiente de la autenticación y de los datos de las tareas.

**Funciones para buscar:**

- [`obtenerTemaInicial` · línea 11](../Proyecto2/src/components/themeButton/useTema.ts#L11)
- [`useTema` · línea 16](../Proyecto2/src/components/themeButton/useTema.ts#L16)

### [Proyecto2/src/main.tsx](../Proyecto2/src/main.tsx)

Punto de entrada del navegador: monta React sobre el elemento raíz del HTML e instala los proveedores/navegación declarados. No es un servidor Node.js ni una conexión a la base.

**Se conecta con:** [Proyecto2/src/index.css](../Proyecto2/src/index.css), [Proyecto2/src/App.tsx](../Proyecto2/src/App.tsx).

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.

### [Proyecto2/vite.config.ts](../Proyecto2/vite.config.ts)

Configuración de Vite para desarrollo/compilación del frontend. Revisar aquí plugins, servidor y proxy cuando estén definidos; no es el backend de cuentas.

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.

## Proyecto3

### [Proyecto3/eslint.config.js](../Proyecto3/eslint.config.js)

Configuración del análisis estático de código. Define reglas y archivos revisados; no decide permisos de usuarios ni persistencia.

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.

### [Proyecto3/src/App.tsx](../Proyecto3/src/App.tsx)

Composición del ejercicio: conecta el marco visual con el componente que demuestra el concepto de React. Los datos por props y el estado local pertenecen al ejercicio; aquí no existe un backend.

**Se conecta con:** [Proyecto3/src/components/StudioLayout/StudioLayout.tsx](../Proyecto3/src/components/StudioLayout/StudioLayout.tsx), [Proyecto3/src/components/counter/Counter.tsx](../Proyecto3/src/components/counter/Counter.tsx).

**Funciones para buscar:**

- [`App` · línea 10](../Proyecto3/src/App.tsx#L10)

### [Proyecto3/src/components/counter/Counter.tsx](../Proyecto3/src/components/counter/Counter.tsx)

Ejercicio de estado local: los botones actualizan el contador con el valor anterior y React vuelve a mostrarlo. No hay API ni persistencia del contador entre recargas.

**Se conecta con:** [Proyecto3/src/components/counter/Counter.css](../Proyecto3/src/components/counter/Counter.css).

**Funciones para buscar:**

- [`Counter` · línea 10](../Proyecto3/src/components/counter/Counter.tsx#L10)

### [Proyecto3/src/components/StudioLayout/StudioLayout.tsx](../Proyecto3/src/components/StudioLayout/StudioLayout.tsx)

Componente reutilizable StudioLayout. Sus props conectan contenido y acciones con el componente que lo usa; para seguir el dato, buscar sus importaciones y los callbacks recibidos en lugar de suponer que guarda directamente en una base.

**Se conecta con:** [Proyecto3/src/components/themeButton/themeButton.tsx](../Proyecto3/src/components/themeButton/themeButton.tsx), [Proyecto3/src/components/StudioLayout/StudioLayout.css](../Proyecto3/src/components/StudioLayout/StudioLayout.css).

**Funciones para buscar:**

- [`StudioLayout` · línea 21](../Proyecto3/src/components/StudioLayout/StudioLayout.tsx#L21)

### [Proyecto3/src/components/themeButton/themeButton.tsx](../Proyecto3/src/components/themeButton/themeButton.tsx)

Parte del sistema visual: comparte colores, tamaños o preferencia de tema según su implementación. La preferencia de apariencia es independiente de la autenticación y de los datos de las tareas.

**Se conecta con:** [Proyecto3/src/components/themeButton/themeButton.css](../Proyecto3/src/components/themeButton/themeButton.css), [Proyecto3/src/components/themeButton/useTema.ts](../Proyecto3/src/components/themeButton/useTema.ts).

**Funciones para buscar:**

- [`ThemeButton` · línea 10](../Proyecto3/src/components/themeButton/themeButton.tsx#L10)

### [Proyecto3/src/components/themeButton/useTema.ts](../Proyecto3/src/components/themeButton/useTema.ts)

Parte del sistema visual: comparte colores, tamaños o preferencia de tema según su implementación. La preferencia de apariencia es independiente de la autenticación y de los datos de las tareas.

**Funciones para buscar:**

- [`obtenerTemaInicial` · línea 11](../Proyecto3/src/components/themeButton/useTema.ts#L11)
- [`useTema` · línea 16](../Proyecto3/src/components/themeButton/useTema.ts#L16)

### [Proyecto3/src/main.tsx](../Proyecto3/src/main.tsx)

Punto de entrada del navegador: monta React sobre el elemento raíz del HTML e instala los proveedores/navegación declarados. No es un servidor Node.js ni una conexión a la base.

**Se conecta con:** [Proyecto3/src/index.css](../Proyecto3/src/index.css), [Proyecto3/src/App.tsx](../Proyecto3/src/App.tsx).

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.

### [Proyecto3/vite.config.ts](../Proyecto3/vite.config.ts)

Configuración de Vite para desarrollo/compilación del frontend. Revisar aquí plugins, servidor y proxy cuando estén definidos; no es el backend de cuentas.

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.

## Proyecto4

### [Proyecto4/eslint.config.js](../Proyecto4/eslint.config.js)

Configuración del análisis estático de código. Define reglas y archivos revisados; no decide permisos de usuarios ni persistencia.

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.

### [Proyecto4/src/App.tsx](../Proyecto4/src/App.tsx)

Mapa de rutas del gestor y proveedor compartido de tareas. Cambiar de página no debería crear una lista distinta; todas las pantallas consumen el mismo contexto.

**Se conecta con:** [Proyecto4/src/context/TaskContext/TaskProvider.tsx](../Proyecto4/src/context/TaskContext/TaskProvider.tsx), [Proyecto4/src/components/Layout/Layout.tsx](../Proyecto4/src/components/Layout/Layout.tsx), [Proyecto4/src/pages/CreateTaskPage/CreateTaskPage.tsx](../Proyecto4/src/pages/CreateTaskPage/CreateTaskPage.tsx), [Proyecto4/src/pages/HomePage/HomePage.tsx](../Proyecto4/src/pages/HomePage/HomePage.tsx), [Proyecto4/src/pages/NotFoundPage/NotFoundPage.tsx](../Proyecto4/src/pages/NotFoundPage/NotFoundPage.tsx), [Proyecto4/src/pages/TaskDetailPage/TaskDetailPage.tsx](../Proyecto4/src/pages/TaskDetailPage/TaskDetailPage.tsx), [Proyecto4/src/pages/EditTaskPage/EditTaskPage.tsx](../Proyecto4/src/pages/EditTaskPage/EditTaskPage.tsx).

**Funciones para buscar:**

- [`App` · línea 16](../Proyecto4/src/App.tsx#L16)

### [Proyecto4/src/components/DeleteTaskButton/DeleteTaskButton.tsx](../Proyecto4/src/components/DeleteTaskButton/DeleteTaskButton.tsx)

Confirmación reutilizable para una acción destructiva. Abrir el diálogo no borra: el callback se ejecuta al confirmar y las reglas de negocio permanecen en el proveedor.

**Se conecta con:** [Proyecto4/src/components/DeleteTaskButton/DeleteTaskButton.css](../Proyecto4/src/components/DeleteTaskButton/DeleteTaskButton.css).

**Funciones para buscar:**

- [`DeleteTaskButton` · línea 21](../Proyecto4/src/components/DeleteTaskButton/DeleteTaskButton.tsx#L21)
- [`closeDialog` · línea 42](../Proyecto4/src/components/DeleteTaskButton/DeleteTaskButton.tsx#L42)
- [`confirmDelete` · línea 47](../Proyecto4/src/components/DeleteTaskButton/DeleteTaskButton.tsx#L47)

### [Proyecto4/src/components/Header/Header.tsx](../Proyecto4/src/components/Header/Header.tsx)

Componente reutilizable Header. Sus props conectan contenido y acciones con el componente que lo usa; para seguir el dato, buscar sus importaciones y los callbacks recibidos en lugar de suponer que guarda directamente en una base.

**Se conecta con:** [Proyecto4/src/components/ThemeButton/ThemeButton.tsx](../Proyecto4/src/components/ThemeButton/ThemeButton.tsx), [Proyecto4/src/components/Header/Header.css](../Proyecto4/src/components/Header/Header.css).

**Funciones para buscar:**

- [`Header` · línea 11](../Proyecto4/src/components/Header/Header.tsx#L11)

### [Proyecto4/src/components/Layout/Layout.tsx](../Proyecto4/src/components/Layout/Layout.tsx)

Componente reutilizable Layout. Sus props conectan contenido y acciones con el componente que lo usa; para seguir el dato, buscar sus importaciones y los callbacks recibidos en lugar de suponer que guarda directamente en una base.

**Se conecta con:** [Proyecto4/src/components/Header/Header.tsx](../Proyecto4/src/components/Header/Header.tsx), [Proyecto4/src/components/ScrollTopButton/ScrollTopButton.tsx](../Proyecto4/src/components/ScrollTopButton/ScrollTopButton.tsx), [Proyecto4/src/components/Layout/Layout.css](../Proyecto4/src/components/Layout/Layout.css).

**Funciones para buscar:**

- [`Layout` · línea 13](../Proyecto4/src/components/Layout/Layout.tsx#L13)

### [Proyecto4/src/components/PageHeading/PageHeading.tsx](../Proyecto4/src/components/PageHeading/PageHeading.tsx)

Componente reutilizable PageHeading. Sus props conectan contenido y acciones con el componente que lo usa; para seguir el dato, buscar sus importaciones y los callbacks recibidos en lugar de suponer que guarda directamente en una base.

**Se conecta con:** [Proyecto4/src/components/PageHeading/PageHeading.css](../Proyecto4/src/components/PageHeading/PageHeading.css).

**Funciones para buscar:**

- [`PageHeading` · línea 18](../Proyecto4/src/components/PageHeading/PageHeading.tsx#L18)

### [Proyecto4/src/components/ScrollTopButton/ScrollTopButton.tsx](../Proyecto4/src/components/ScrollTopButton/ScrollTopButton.tsx)

Componente reutilizable ScrollTopButton. Sus props conectan contenido y acciones con el componente que lo usa; para seguir el dato, buscar sus importaciones y los callbacks recibidos en lugar de suponer que guarda directamente en una base.

**Se conecta con:** [Proyecto4/src/components/ThemeButton/ThemeButton.css](../Proyecto4/src/components/ThemeButton/ThemeButton.css), [Proyecto4/src/components/ScrollTopButton/ScrollTopButton.css](../Proyecto4/src/components/ScrollTopButton/ScrollTopButton.css).

**Funciones para buscar:**

- [`ScrollTopButton` · línea 11](../Proyecto4/src/components/ScrollTopButton/ScrollTopButton.tsx#L11)
- [`updateVisibility` · línea 15](../Proyecto4/src/components/ScrollTopButton/ScrollTopButton.tsx#L15)

### [Proyecto4/src/components/StatusBadge/StatusBadge.tsx](../Proyecto4/src/components/StatusBadge/StatusBadge.tsx)

Componente reutilizable StatusBadge. Sus props conectan contenido y acciones con el componente que lo usa; para seguir el dato, buscar sus importaciones y los callbacks recibidos en lugar de suponer que guarda directamente en una base.

**Se conecta con:** [Proyecto4/src/components/StatusBadge/StatusBadge.css](../Proyecto4/src/components/StatusBadge/StatusBadge.css), [Proyecto4/src/types/Task.ts](../Proyecto4/src/types/Task.ts).

**Funciones para buscar:**

- [`StatusBadge` · línea 17](../Proyecto4/src/components/StatusBadge/StatusBadge.tsx#L17)

### [Proyecto4/src/components/TaskCard/TaskCard.tsx](../Proyecto4/src/components/TaskCard/TaskCard.tsx)

Resumen visual de una tarea recibido por props. Sus enlaces y callbacks usan el ID; los datos persistentes siguen perteneciendo al proveedor.

**Se conecta con:** [Proyecto4/src/types/Task.ts](../Proyecto4/src/types/Task.ts), [Proyecto4/src/utils/formatDate.ts](../Proyecto4/src/utils/formatDate.ts), [Proyecto4/src/components/DeleteTaskButton/DeleteTaskButton.tsx](../Proyecto4/src/components/DeleteTaskButton/DeleteTaskButton.tsx), [Proyecto4/src/components/StatusBadge/StatusBadge.tsx](../Proyecto4/src/components/StatusBadge/StatusBadge.tsx), [Proyecto4/src/components/TaskCard/TaskCard.css](../Proyecto4/src/components/TaskCard/TaskCard.css).

**Funciones para buscar:**

- [`TaskCard` · línea 20](../Proyecto4/src/components/TaskCard/TaskCard.tsx#L20)

### [Proyecto4/src/components/TaskDataControls/TaskDataControls.tsx](../Proyecto4/src/components/TaskDataControls/TaskDataControls.tsx)

Respaldo manual del gestor. Descargar genera un archivo JSON independiente de localStorage; Cargar valida un archivo y pide confirmación antes de reemplazar datos existentes.

**Se conecta con:** [Proyecto4/src/context/TaskContext/useTasks.ts](../Proyecto4/src/context/TaskContext/useTasks.ts), [Proyecto4/src/utils/taskBackup.ts](../Proyecto4/src/utils/taskBackup.ts), [Proyecto4/src/components/TaskDataControls/TaskDataControls.css](../Proyecto4/src/components/TaskDataControls/TaskDataControls.css).

**Funciones para buscar:**

- [`TaskDataControls` · línea 17](../Proyecto4/src/components/TaskDataControls/TaskDataControls.tsx#L17)
- [`downloadBackup` · línea 28](../Proyecto4/src/components/TaskDataControls/TaskDataControls.tsx#L28): Toma el estado actual, construye un Blob JSON y activa un enlace de descarga. El navegador decide dónde guardar el archivo; después se libera la URL temporal.
- [`applyBackup` · línea 47](../Proyecto4/src/components/TaskDataControls/TaskDataControls.tsx#L47): Entrega las listas validadas al proveedor de tareas y muestra el resultado. No informa éxito cuando el proveedor rechaza duplicados.
- [`loadBackup` · línea 63](../Proyecto4/src/components/TaskDataControls/TaskDataControls.tsx#L63): Lee el archivo seleccionado y valida su contenido. Si ya existen datos, espera una confirmación antes de reemplazarlos. Captura errores para mostrarlos dentro de la página.
- [`closeDialog` · línea 87](../Proyecto4/src/components/TaskDataControls/TaskDataControls.tsx#L87)
- [`confirmReplacement` · línea 96](../Proyecto4/src/components/TaskDataControls/TaskDataControls.tsx#L96): Aplica el respaldo pendiente solo después de la confirmación explícita; cerrar el diálogo sin confirmar no importa datos.

### [Proyecto4/src/components/ThemeButton/ThemeButton.tsx](../Proyecto4/src/components/ThemeButton/ThemeButton.tsx)

Parte del sistema visual: comparte colores, tamaños o preferencia de tema según su implementación. La preferencia de apariencia es independiente de la autenticación y de los datos de las tareas.

**Se conecta con:** [Proyecto4/src/components/ThemeButton/useTheme.ts](../Proyecto4/src/components/ThemeButton/useTheme.ts), [Proyecto4/src/components/ThemeButton/ThemeButton.css](../Proyecto4/src/components/ThemeButton/ThemeButton.css).

**Funciones para buscar:**

- [`ThemeButton` · línea 10](../Proyecto4/src/components/ThemeButton/ThemeButton.tsx#L10)

### [Proyecto4/src/components/ThemeButton/useTheme.ts](../Proyecto4/src/components/ThemeButton/useTheme.ts)

Parte del sistema visual: comparte colores, tamaños o preferencia de tema según su implementación. La preferencia de apariencia es independiente de la autenticación y de los datos de las tareas.

**Funciones para buscar:**

- [`obtenerTemaInicial` · línea 11](../Proyecto4/src/components/ThemeButton/useTheme.ts#L11)
- [`useTema` · línea 16](../Proyecto4/src/components/ThemeButton/useTheme.ts#L16)

### [Proyecto4/src/context/TaskContext/taskContextDefinition.ts](../Proyecto4/src/context/TaskContext/taskContextDefinition.ts)

Define el contrato del contexto: qué datos y operaciones pueden consumir las pantallas. Crear el contexto no carga datos; el valor real lo aporta TaskProvider.

**Se conecta con:** [Proyecto4/src/types/Task.ts](../Proyecto4/src/types/Task.ts).

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.

### [Proyecto4/src/context/TaskContext/TaskProvider.tsx](../Proyecto4/src/context/TaskContext/TaskProvider.tsx)

Es el centro del gestor de tareas: comparte el estado entre páginas y concentra todas las escrituras en localStorage. La pantalla solicita una operación; este proveedor decide si se permite y guarda la lista completa.

**Se conecta con:** [Proyecto4/src/types/Task.ts](../Proyecto4/src/types/Task.ts), [Proyecto4/src/utils/normalizeTitle.ts](../Proyecto4/src/utils/normalizeTitle.ts), [Proyecto4/src/context/TaskContext/taskContextDefinition.ts](../Proyecto4/src/context/TaskContext/taskContextDefinition.ts).

**Funciones para buscar:**

- [`getDefaultDueDate` · línea 16](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L16)
- [`loadTasks` · línea 27](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L27): Lee la clave lista-de-tareas del navegador. JSON.parse reconstruye los objetos; si falta el dato o no se puede interpretar, devuelve una lista vacía. No consulta un servidor.
- [`loadQuickTasks` · línea 50](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L50): Recupera los atajos del almacenamiento del navegador. Son plantillas para crear tareas: no son una segunda lista de tareas activas.
- [`TaskProvider` · línea 72](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L72): Envuelve las pantallas y es dueño del estado compartido. useState(loadTasks) lee el almacenamiento al iniciar; las referencias permiten validar también dos envíos consecutivos antes del próximo render.
- [`saveTasks` · línea 85](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L85): Recibe la lista completa ya modificada. La convierte a texto JSON para localStorage, actualiza la referencia inmediata y llama a setTasks para volver a dibujar la pantalla. Guardar no descarga un archivo.
- [`saveQuickTasks` · línea 95](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L95): Conserva las plantillas en una clave distinta de las tareas y sincroniza su referencia y estado de React. No cambia las tareas creadas anteriormente.
- [`addTask` · línea 106](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L106): Recibe título, descripción y fecha de entrega. Rechaza títulos vacíos, largos o repetidos; agrega ID, fecha de creación y estado pendiente. Devuelve la tarea creada, o null si no se pudo crear.
- [`updateTaskStatus` · línea 132](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L132): Recibe un ID y el nuevo estado. Recorre la lista sin modificar los otros elementos y usa el mismo guardado central que el alta.
- [`updateTask` · línea 142](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L142): Busca una tarea por ID y valida el nuevo título contra el resto. No permite editar una completada. Guarda la lista modificada y devuelve si aceptó el cambio.
- [`addQuickTask` · línea 163](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L163): Transforma una tarea sin fecha en una plantilla reutilizable. Rechaza plantillas con el mismo título; devuelve si pudo agregarla.
- [`removeQuickTask` · línea 186](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L186): Quita únicamente la plantilla indicada. Las tareas que ya se crearon a partir de ella siguen existiendo.
- [`deleteTask` · línea 194](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L194): Filtra la lista por ID, pero elimina solo si esa tarea está completada. La regla se aplica aquí aunque otro componente intente saltarse el botón.
- [`clearCompletedTasks` · línea 203](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L203): Guarda una nueva lista que conserva solo las tareas no completadas; no borra las plantillas de atajos.
- [`replaceTaskData` · línea 212](../Proyecto4/src/context/TaskContext/TaskProvider.tsx#L212): Recibe tareas y plantillas importadas, ya interpretadas por el lector de respaldos. Rechaza títulos repetidos y reemplaza almacenamiento, referencias y estado; no combina con la lista anterior.

### [Proyecto4/src/context/TaskContext/useTasks.ts](../Proyecto4/src/context/TaskContext/useTasks.ts)

Es la puerta de entrada al contexto de tareas. Evita pasar toda la lista por props entre páginas y detecta si falta el proveedor.

**Se conecta con:** [Proyecto4/src/context/TaskContext/taskContextDefinition.ts](../Proyecto4/src/context/TaskContext/taskContextDefinition.ts).

**Funciones para buscar:**

- [`useTasks` · línea 14](../Proyecto4/src/context/TaskContext/useTasks.ts#L14): Entrega a cada pantalla las tareas y operaciones del contexto compartido. Falla si se llama fuera de TaskProvider, porque allí no existiría una lista común.

### [Proyecto4/src/main.tsx](../Proyecto4/src/main.tsx)

Punto de entrada del navegador: monta React sobre el elemento raíz del HTML e instala los proveedores/navegación declarados. No es un servidor Node.js ni una conexión a la base.

**Se conecta con:** [Proyecto4/src/App.tsx](../Proyecto4/src/App.tsx), [Proyecto4/src/index.css](../Proyecto4/src/index.css).

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.

### [Proyecto4/src/pages/CreateTaskPage/CreateTaskPage.tsx](../Proyecto4/src/pages/CreateTaskPage/CreateTaskPage.tsx)

Formulario de alta y atajos. Conserva borradores locales de los campos y delega la creación real a addTask del contexto; luego navega al detalle de la tarea creada.

**Se conecta con:** [Proyecto4/src/components/DeleteTaskButton/DeleteTaskButton.tsx](../Proyecto4/src/components/DeleteTaskButton/DeleteTaskButton.tsx), [Proyecto4/src/components/PageHeading/PageHeading.tsx](../Proyecto4/src/components/PageHeading/PageHeading.tsx), [Proyecto4/src/components/StatusBadge/StatusBadge.tsx](../Proyecto4/src/components/StatusBadge/StatusBadge.tsx), [Proyecto4/src/context/TaskContext/useTasks.ts](../Proyecto4/src/context/TaskContext/useTasks.ts), [Proyecto4/src/types/Task.ts](../Proyecto4/src/types/Task.ts), [Proyecto4/src/utils/formatDate.ts](../Proyecto4/src/utils/formatDate.ts), [Proyecto4/src/utils/normalizeTitle.ts](../Proyecto4/src/utils/normalizeTitle.ts), [Proyecto4/src/components/Button/Button.css](../Proyecto4/src/components/Button/Button.css), [Proyecto4/src/pages/CreateTaskPage/CreateTaskPage.css](../Proyecto4/src/pages/CreateTaskPage/CreateTaskPage.css).

**Funciones para buscar:**

- [`CreateTaskPage` · línea 19](../Proyecto4/src/pages/CreateTaskPage/CreateTaskPage.tsx#L19)
- [`handleSubmit` · línea 58](../Proyecto4/src/pages/CreateTaskPage/CreateTaskPage.tsx#L58)
- [`createQuickTask` · línea 70](../Proyecto4/src/pages/CreateTaskPage/CreateTaskPage.tsx#L70)

### [Proyecto4/src/pages/EditTaskPage/EditTaskPage.tsx](../Proyecto4/src/pages/EditTaskPage/EditTaskPage.tsx)

Editor de una tarea existente. El ID de la ruta permite encontrarla; el formulario no crea otra tarea ni debe modificar una que ya esté completada.

**Se conecta con:** [Proyecto4/src/components/PageHeading/PageHeading.tsx](../Proyecto4/src/components/PageHeading/PageHeading.tsx), [Proyecto4/src/context/TaskContext/useTasks.ts](../Proyecto4/src/context/TaskContext/useTasks.ts), [Proyecto4/src/utils/normalizeTitle.ts](../Proyecto4/src/utils/normalizeTitle.ts), [Proyecto4/src/components/Button/Button.css](../Proyecto4/src/components/Button/Button.css), [Proyecto4/src/pages/CreateTaskPage/CreateTaskPage.css](../Proyecto4/src/pages/CreateTaskPage/CreateTaskPage.css).

**Funciones para buscar:**

- [`EditTaskPage` · línea 14](../Proyecto4/src/pages/EditTaskPage/EditTaskPage.tsx#L14)
- [`handleSubmit` · línea 38](../Proyecto4/src/pages/EditTaskPage/EditTaskPage.tsx#L38)

### [Proyecto4/src/pages/HomePage/HomePage.tsx](../Proyecto4/src/pages/HomePage/HomePage.tsx)

Pantalla HomePage. Coordina presentación y eventos; seguir los servicios, hooks o contexto importados para encontrar dónde se comprueban y guardan los datos.

**Se conecta con:** [Proyecto4/src/components/PageHeading/PageHeading.tsx](../Proyecto4/src/components/PageHeading/PageHeading.tsx), [Proyecto4/src/components/TaskCard/TaskCard.tsx](../Proyecto4/src/components/TaskCard/TaskCard.tsx), [Proyecto4/src/components/DeleteTaskButton/DeleteTaskButton.tsx](../Proyecto4/src/components/DeleteTaskButton/DeleteTaskButton.tsx), [Proyecto4/src/context/TaskContext/useTasks.ts](../Proyecto4/src/context/TaskContext/useTasks.ts), [Proyecto4/src/types/Task.ts](../Proyecto4/src/types/Task.ts), [Proyecto4/src/components/StatusBadge/StatusBadge.tsx](../Proyecto4/src/components/StatusBadge/StatusBadge.tsx), [Proyecto4/src/components/TaskDataControls/TaskDataControls.tsx](../Proyecto4/src/components/TaskDataControls/TaskDataControls.tsx), [Proyecto4/src/utils/formatDate.ts](../Proyecto4/src/utils/formatDate.ts), [Proyecto4/src/components/Button/Button.css](../Proyecto4/src/components/Button/Button.css), [Proyecto4/src/pages/HomePage/HomePage.css](../Proyecto4/src/pages/HomePage/HomePage.css).

**Funciones para buscar:**

- [`HomePage` · línea 20](../Proyecto4/src/pages/HomePage/HomePage.tsx#L20)
- [`scrollToTask` · línea 60](../Proyecto4/src/pages/HomePage/HomePage.tsx#L60)
- [`renderTasks` · línea 79](../Proyecto4/src/pages/HomePage/HomePage.tsx#L79)

### [Proyecto4/src/pages/NotFoundPage/NotFoundPage.tsx](../Proyecto4/src/pages/NotFoundPage/NotFoundPage.tsx)

Pantalla NotFoundPage. Coordina presentación y eventos; seguir los servicios, hooks o contexto importados para encontrar dónde se comprueban y guardan los datos.

**Se conecta con:** [Proyecto4/src/components/Button/Button.css](../Proyecto4/src/components/Button/Button.css), [Proyecto4/src/pages/TaskDetailPage/TaskDetailPage.css](../Proyecto4/src/pages/TaskDetailPage/TaskDetailPage.css).

**Funciones para buscar:**

- [`NotFoundPage` · línea 12](../Proyecto4/src/pages/NotFoundPage/NotFoundPage.tsx#L12)

### [Proyecto4/src/pages/TaskDetailPage/TaskDetailPage.tsx](../Proyecto4/src/pages/TaskDetailPage/TaskDetailPage.tsx)

Consulta la tarea cuyo ID aparece en la dirección y muestra sus datos y acciones. Si no existe, no inventa una tarea: presenta el estado correspondiente.

**Se conecta con:** [Proyecto4/src/components/DeleteTaskButton/DeleteTaskButton.tsx](../Proyecto4/src/components/DeleteTaskButton/DeleteTaskButton.tsx), [Proyecto4/src/components/PageHeading/PageHeading.tsx](../Proyecto4/src/components/PageHeading/PageHeading.tsx), [Proyecto4/src/components/StatusBadge/StatusBadge.tsx](../Proyecto4/src/components/StatusBadge/StatusBadge.tsx), [Proyecto4/src/context/TaskContext/useTasks.ts](../Proyecto4/src/context/TaskContext/useTasks.ts), [Proyecto4/src/utils/formatDate.ts](../Proyecto4/src/utils/formatDate.ts), [Proyecto4/src/utils/normalizeTitle.ts](../Proyecto4/src/utils/normalizeTitle.ts), [Proyecto4/src/types/Task.ts](../Proyecto4/src/types/Task.ts), [Proyecto4/src/components/Button/Button.css](../Proyecto4/src/components/Button/Button.css), [Proyecto4/src/pages/TaskDetailPage/TaskDetailPage.css](../Proyecto4/src/pages/TaskDetailPage/TaskDetailPage.css).

**Funciones para buscar:**

- [`TaskDetailPage` · línea 17](../Proyecto4/src/pages/TaskDetailPage/TaskDetailPage.tsx#L17)

### [Proyecto4/src/types/Task.ts](../Proyecto4/src/types/Task.ts)

Contrato TypeScript de los datos que comparten los módulos. Describe campos y tipos para comprobar el código, pero no crea tablas ni valida por sí solo un JSON recibido en ejecución.

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.

### [Proyecto4/src/utils/formatDate.ts](../Proyecto4/src/utils/formatDate.ts)

Funciones puras de fechas para las pantallas de tareas. Separan la representación legible del dato guardado y el cálculo de vencimiento.

**Funciones para buscar:**

- [`formatDate` · línea 7](../Proyecto4/src/utils/formatDate.ts#L7)
- [`formatShortDate` · línea 14](../Proyecto4/src/utils/formatDate.ts#L14)
- [`formatDueDate` · línea 23](../Proyecto4/src/utils/formatDate.ts#L23)
- [`isDueDateOverdue` · línea 30](../Proyecto4/src/utils/formatDate.ts#L30)

### [Proyecto4/src/utils/normalizeTitle.ts](../Proyecto4/src/utils/normalizeTitle.ts)

Reglas compartidas para comparar títulos. Se usan en alta, edición, atajos e importación para evitar que cada pantalla tenga una definición distinta de tarea repetida.

**Funciones para buscar:**

- [`normalizeTitle` · línea 12](../Proyecto4/src/utils/normalizeTitle.ts#L12): Crea una forma comparable del título, ignorando diferencias de mayúsculas, acentos y espacios repetidos. Sirve para detectar duplicados, no para cambiar el texto que ve la persona.
- [`hasUniqueTitles` · línea 26](../Proyecto4/src/utils/normalizeTitle.ts#L26): Compara la cantidad de títulos normalizados distintos con la cantidad de elementos. Devuelve false si dos entradas representan el mismo título.

### [Proyecto4/src/utils/taskBackup.ts](../Proyecto4/src/utils/taskBackup.ts)

Contrato del archivo de respaldo: define formato y versión y valida los datos importados. Un JSON bien formado todavía puede ser inválido para el gestor si le faltan campos o contiene duplicados.

**Se conecta con:** [Proyecto4/src/types/Task.ts](../Proyecto4/src/types/Task.ts), [Proyecto4/src/utils/normalizeTitle.ts](../Proyecto4/src/utils/normalizeTitle.ts).

**Funciones para buscar:**

- [`isRecord` · línea 22](../Proyecto4/src/utils/taskBackup.ts#L22)
- [`isNonEmptyText` · línea 26](../Proyecto4/src/utils/taskBackup.ts#L26)
- [`isValidDateTime` · línea 30](../Proyecto4/src/utils/taskBackup.ts#L30)
- [`isValidDueDate` · línea 34](../Proyecto4/src/utils/taskBackup.ts#L34)
- [`isTask` · línea 45](../Proyecto4/src/utils/taskBackup.ts#L45)
- [`isQuickTask` · línea 57](../Proyecto4/src/utils/taskBackup.ts#L57)
- [`hasUniqueIds` · línea 65](../Proyecto4/src/utils/taskBackup.ts#L65)
- [`createTaskBackup` · línea 73](../Proyecto4/src/utils/taskBackup.ts#L73): Arma el objeto de respaldo con formato, versión, fecha y ambas listas. Todavía no crea una descarga ni escribe en el disco.
- [`parseTaskBackup` · línea 88](../Proyecto4/src/utils/taskBackup.ts#L88): Recibe el texto de un archivo elegido por la persona. Interpreta JSON y valida formato, campos, fechas, estados, IDs y títulos antes de permitir reemplazar los datos actuales. Lanza un error si no sirve.

### [Proyecto4/vite.config.ts](../Proyecto4/vite.config.ts)

Configuración de Vite para desarrollo/compilación del frontend. Revisar aquí plugins, servidor y proxy cuando estén definidos; no es el backend de cuentas.

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.

## Proyecto5

### [Proyecto5/eslint.config.js](../Proyecto5/eslint.config.js)

Configuración del análisis estático de código. Define reglas y archivos revisados; no decide permisos de usuarios ni persistencia.

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.

### [Proyecto5/src/App.tsx](../Proyecto5/src/App.tsx)

Composición del ejercicio: conecta el marco visual con el componente que demuestra el concepto de React. Los datos por props y el estado local pertenecen al ejercicio; aquí no existe un backend.

**Se conecta con:** [Proyecto5/src/components/StudioLayout/StudioLayout.tsx](../Proyecto5/src/components/StudioLayout/StudioLayout.tsx), [Proyecto5/src/components/FormularioSaludo/FormularioSaludo.tsx](../Proyecto5/src/components/FormularioSaludo/FormularioSaludo.tsx), [Proyecto5/src/App.css](../Proyecto5/src/App.css).

**Funciones para buscar:**

- [`App` · línea 11](../Proyecto5/src/App.tsx#L11)

### [Proyecto5/src/components/FormularioSaludo/FormularioSaludo.tsx](../Proyecto5/src/components/FormularioSaludo/FormularioSaludo.tsx)

Formulario controlado: el estado conserva el texto mientras se escribe. Valida nuevamente al enviar y genera el saludo solo si el nombre es válido.

**Se conecta con:** [Proyecto5/src/utils/validateName.ts](../Proyecto5/src/utils/validateName.ts), [Proyecto5/src/components/FormularioSaludo/FormularioSaludo.css](../Proyecto5/src/components/FormularioSaludo/FormularioSaludo.css).

**Funciones para buscar:**

- [`obtenerSaludo` · línea 15](../Proyecto5/src/components/FormularioSaludo/FormularioSaludo.tsx#L15): Elige el saludo según la hora local del dispositivo. No pide la hora a una API ni identifica a un usuario registrado.
- [`FormularioSaludo` · línea 23](../Proyecto5/src/components/FormularioSaludo/FormularioSaludo.tsx#L23)
- [`actualizarNombre` · línea 32](../Proyecto5/src/components/FormularioSaludo/FormularioSaludo.tsx#L32): Filtra caracteres del borrador y limpia la respuesta anterior. Una entrada aceptada mientras se escribe todavía debe pasar la validación final de longitud al enviar.
- [`enviarFormulario` · línea 47](../Proyecto5/src/components/FormularioSaludo/FormularioSaludo.tsx#L47): Evita la recarga del navegador y solo acepta un nombre completo válido. El saludo confirmado y el texto que se está editando son estados diferentes.

### [Proyecto5/src/components/StudioLayout/StudioLayout.tsx](../Proyecto5/src/components/StudioLayout/StudioLayout.tsx)

Componente reutilizable StudioLayout. Sus props conectan contenido y acciones con el componente que lo usa; para seguir el dato, buscar sus importaciones y los callbacks recibidos en lugar de suponer que guarda directamente en una base.

**Se conecta con:** [Proyecto5/src/components/themeButton/themeButton.tsx](../Proyecto5/src/components/themeButton/themeButton.tsx), [Proyecto5/src/components/StudioLayout/StudioLayout.css](../Proyecto5/src/components/StudioLayout/StudioLayout.css).

**Funciones para buscar:**

- [`StudioLayout` · línea 21](../Proyecto5/src/components/StudioLayout/StudioLayout.tsx#L21)

### [Proyecto5/src/components/themeButton/themeButton.ts](../Proyecto5/src/components/themeButton/themeButton.ts)

Parte del sistema visual: comparte colores, tamaños o preferencia de tema según su implementación. La preferencia de apariencia es independiente de la autenticación y de los datos de las tareas.

**Funciones para buscar:**

- [`obtenerTemaInicial` · línea 11](../Proyecto5/src/components/themeButton/themeButton.ts#L11)
- [`useTema` · línea 16](../Proyecto5/src/components/themeButton/themeButton.ts#L16)

### [Proyecto5/src/components/themeButton/themeButton.tsx](../Proyecto5/src/components/themeButton/themeButton.tsx)

Parte del sistema visual: comparte colores, tamaños o preferencia de tema según su implementación. La preferencia de apariencia es independiente de la autenticación y de los datos de las tareas.

**Se conecta con:** [Proyecto5/src/components/themeButton/themeButton.css](../Proyecto5/src/components/themeButton/themeButton.css), [Proyecto5/src/components/themeButton/themeButton.ts](../Proyecto5/src/components/themeButton/themeButton.ts).

**Funciones para buscar:**

- [`ThemeButton` · línea 10](../Proyecto5/src/components/themeButton/themeButton.tsx#L10)

### [Proyecto5/src/main.tsx](../Proyecto5/src/main.tsx)

Punto de entrada del navegador: monta React sobre el elemento raíz del HTML e instala los proveedores/navegación declarados. No es un servidor Node.js ni una conexión a la base.

**Se conecta con:** [Proyecto5/src/index.css](../Proyecto5/src/index.css), [Proyecto5/src/App.tsx](../Proyecto5/src/App.tsx).

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.

### [Proyecto5/src/utils/validateName.ts](../Proyecto5/src/utils/validateName.ts)

Validación del nombre del ejercicio de saludo, no del username de un login. Permite letras del alfabeto contemplado y espacios comunes; rechaza números y signos tanto al escribir como al enviar.

**Funciones para buscar:**

- [`isAllowedNameInput` · línea 13](../Proyecto5/src/utils/validateName.ts#L13): Acepta el alfabeto definido y espacios comunes, incluso mientras el campo está vacío. No verifica por sí sola la longitud mínima de un nombre terminado.
- [`isValidName` · línea 22](../Proyecto5/src/utils/validateName.ts#L22): Normaliza acentos, recorta extremos y exige entre 2 y 50 caracteres permitidos. Es la validación final antes de mostrar el saludo.

### [Proyecto5/vite.config.ts](../Proyecto5/vite.config.ts)

Configuración de Vite para desarrollo/compilación del frontend. Revisar aquí plugins, servidor y proxy cuando estén definidos; no es el backend de cuentas.

Este archivo define composición, datos, configuración, tipos o reexportaciones. Seguir sus importaciones o buscar dónde se utiliza para ver el efecto en la aplicación.
