# NODO · Colección de experiencias

## Entender el código paso a paso

- [Guía sencilla de funcionamiento](docs/LEER-EL-CODIGO.md): recorrido de los datos, guardado, pantallas y operaciones.
- [Mapa de archivos y funciones](docs/MAPA-ARCHIVOS-Y-FUNCIONES.md): enlaces al código y conexiones entre módulos.
- [Correcciones de estilos y tarjeta](docs/CORRECCIONES-ESTILOS-Y-TARJETA.md): archivos modificados, operaciones y comprobaciones de los ejercicios 1 y 2.

Los comentarios dentro de los archivos explican las decisiones y efectos importantes en español. La documentación distingue ejecución normal, demo y límites pendientes; no contiene claves privadas.

Cinco aplicaciones independientes con React, TypeScript y Vite. Proyecto4 también utiliza React Router. El rediseño usa grafito, superficies verdes oscuras, acentos lima, tipografía del sistema y componentes responsive.

## Aplicaciones

| Carpeta | Experiencia | Puerto usado para verificar |
| --- | --- | --- |
| Proyecto1 | Saludo que recorre cinco estilos CSS mediante un botón | 5171 |
| Proyecto2 | Tarjeta por props con edición, guardado local y eliminación confirmada | 5172 |
| Proyecto3 | Contador con suma y resta | 5173 |
| Proyecto4 | Tablero, creación, edición, detalle y respaldos de tareas | 5174 |
| Proyecto5 | Formulario con validación y saludo según la hora | 5175 |

## Ejecutar

Abrí una terminal dentro de la carpeta del proyecto elegido. Cada aplicación instala y ejecuta sus propias dependencias:

```powershell
npm install
npm run dev
```

Para usar el mismo puerto de la revisión, por ejemplo en Proyecto4:

```powershell
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

## Verificar

Dentro de cada carpeta:

```powershell
npm run build
npm run lint
```

Los cinco proyectos compilan y pasan ESLint. No contienen un comando de pruebas automatizadas. Se complementó la verificación con pruebas funcionales y visuales en el navegador.

Entorno verificado: Node.js 24.15.0 y npm 11.12.1.

## Decisiones del rediseño

- Tema oscuro inicial y preferencia clara persistente si el usuario la elige.
- Variables de color compartidas conceptualmente, con archivos locales para que cada entrega funcione de manera independiente.
- Cabecera, pie y composición editorial reutilizados mediante StudioLayout en los proyectos de una pantalla.
- Tablero con indicadores derivados de las tareas existentes, tarjetas, estados, formularios y diálogos consistentes.
- Foco visible, mensajes accesibles, un único título principal y enlace para saltar al contenido del gestor.
- Saludo con cinco variantes CSS (Esencial, Editorial, Terminal, Contorno y Cartel), seleccionadas con un botón accesible por teclado y sin animaciones automáticas.
- Tarjeta con nombre, apellido y profesión recibidos por props; edición con borrador, guardado en localStorage y eliminación mediante un diálogo propio, sin alert ni confirm.
- Corrección de mensajes de error que antes permanecían después de enviar un nombre válido.
- Navegación del gestor desde el inicio de cada pantalla.
- Revisión responsive a 320 y 390 píxeles, tablet de 768 píxeles y escritorio de aproximadamente 1280 píxeles.

El estado de las tareas, la persistencia, los atajos y el formato de los respaldos se conservan. La revisión de validaciones exige títulos únicos incluso entre tareas completadas, al crear, editar, usar atajos e importar respaldos. Se comparan ignorando mayúsculas, acentos y espacios repetidos.

El nombre del Proyecto5 admite únicamente letras y espacios comunes, con entre 2 y 50 caracteres. Se rechazan números, comas, apóstrofos, guiones y otros símbolos tanto al escribir como al pegar. Las vocales acentuadas, la ñ y la ü siguen admitidas. La validación vuelve a comprobarse al enviar.

La revisión adicional ejecutó 41 comprobaciones específicas y pruebas en el navegador sobre las versiones compiladas. No se agregaron dependencias de pruebas.

Los datos siguen guardándose en el navegador. No hay un backend en esta colección.

En Proyecto2, App es dueño de los datos y los pasa a Tarjeta mediante props. TarjetaForm conserva un borrador: Cancelar edición descarta lo escrito; Guardar valida los campos y persiste en la clave r1-tarjeta-personal. Eliminar tarjeta abre la pregunta y no borra nada hasta confirmar; Cancelar o Escape conservan los datos. La eliminación también se recuerda al recargar y deja la opción de crear una nueva tarjeta. La foto original sigue llegando por props, pero no se edita en este formulario. Los mensajes de error de almacenamiento se muestran dentro de la página.

Las carpetas src05082026 y src_05082026 conservan las copias históricas. La copia de Proyecto4 se excluye de ESLint porque no integra la aplicación activa ni la compilación.

Los comentarios relevantes del rediseño están escritos en español.
