import { useThemeContext } from '../providers/ThemeContextProvider'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { IconButton, Typography } from '@mui/material'

export function AppHeader() {
  const { toggleTheme, mode } = useThemeContext()

  return (
    <header className="flex items-center gap-2 mb-4 bg-teceo-theme rounded-md p-5">
      <Typography
        variant="h4"
        component="h1"
        className="font-bold flex-1"
        sx={{ fontWeight: 700, color: mode === 'dark' ? 'black' : 'white' }}
      >
        Teceo Challenge
      </Typography>
      <IconButton onClick={toggleTheme} size="large" color="inherit">
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </header>
  )
}
