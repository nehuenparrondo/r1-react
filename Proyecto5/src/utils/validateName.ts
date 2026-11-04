/**
 * Guía de lectura. Validación del nombre del ejercicio de saludo, no del username de un
 * login. Permite letras del alfabeto contemplado y espacios comunes; rechaza números y
 * signos tanto al escribir como al enviar.
 */

const ALLOWED_NAME_CHARACTERS = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]*$/

/**
 * Acepta el alfabeto definido y espacios comunes, incluso mientras el campo está vacío. No
 * verifica por sí sola la longitud mínima de un nombre terminado.
 */
export function isAllowedNameInput(value: string) {
  // Sólo letras y espacios comunes; se excluyen números, signos y otros espacios.
  return ALLOWED_NAME_CHARACTERS.test(value.normalize('NFC'))
}

/**
 * Normaliza acentos, recorta extremos y exige entre 2 y 50 caracteres permitidos. Es la
 * validación final antes de mostrar el saludo.
 */
export function isValidName(value: string) {
  const normalizedName = value.normalize('NFC').trim()
  return normalizedName.length >= 2
    && normalizedName.length <= 50
    && isAllowedNameInput(normalizedName)
}
