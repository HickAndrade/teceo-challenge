import { createContext, useContext, useState, useEffect } from 'react'
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'
import type { PaletteMode } from '@mui/material'
import { getTheme } from '../theme'


interface ThemeContextValue {
  toggleTheme: () => void
  mode: PaletteMode
}

const ThemeContext = createContext({} as ThemeContextValue)
export const useThemeContext = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const saved = localStorage.getItem('theme') as PaletteMode | null
    if (saved) return saved
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }, [mode])

  const toggleTheme = () => {
    const next = mode === 'light' ? 'dark' : 'light'
    setMode(next)
    localStorage.setItem('theme', next)
  }


  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
        {children} 
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
