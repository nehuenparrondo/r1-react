const ALLOWED_NAME_CHARACTERS = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]*$/

export function isAllowedNameInput(value: string) {
  // Sólo letras y espacios comunes; se excluyen números, signos y otros espacios.
  return ALLOWED_NAME_CHARACTERS.test(value.normalize('NFC'))
}

export function isValidName(value: string) {
  const normalizedName = value.normalize('NFC').trim()
  return normalizedName.length >= 2
    && normalizedName.length <= 50
    && isAllowedNameInput(normalizedName)
}
