/**
 * Guía de lectura. Reglas compartidas para comparar títulos. Se usan en alta, edición,
 * atajos e importación para evitar que cada pantalla tenga una definición distinta de
 * tarea repetida.
 */

/**
 * Crea una forma comparable del título, ignorando diferencias de mayúsculas, acentos y
 * espacios repetidos. Sirve para detectar duplicados, no para cambiar el texto que ve la
 * persona.
 */
export function normalizeTitle(value: string) {
  // Unifica acentos, espacios y mayúsculas antes de buscar o comparar títulos.
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase('es')
}

/**
 * Compara la cantidad de títulos normalizados distintos con la cantidad de elementos.
 * Devuelve false si dos entradas representan el mismo título.
 */
export function hasUniqueTitles(items: Array<{ title: string }>) {
  const titles = items.map((item) => normalizeTitle(item.title))
  return titles.every((title) => title.length > 0)
    && new Set(titles).size === titles.length
}
