import { useCallback, useEffect, useState } from 'react'

type Tema = 'dark' | 'light'

function obtenerTemaInicial(): Tema {
  const guardado = localStorage.getItem('tema')
  return guardado === 'light' ? 'light' : 'dark'
}

export function useTema() {
  const [tema, setTema] = useState<Tema>(obtenerTemaInicial)

  useEffect(() => {
    // Ambas clases se actualizan juntas para evitar mezclar las dos paletas.
    document.documentElement.classList.toggle('dark', tema === 'dark')
    document.documentElement.classList.toggle('light', tema === 'light')
    localStorage.setItem('tema', tema)
  }, [tema])

  const toggleTema = useCallback(() => {
    setTema((actual) => actual === 'dark' ? 'light' : 'dark')
  }, [])

  return { tema, toggleTema }
}
