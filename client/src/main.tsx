import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { ThemeProvider } from './providers/ThemeContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from './components/SnackbarProvider'

const queryClient = new QueryClient()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider>
    <ThemeProvider>
       <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    </ThemeProvider>
    </SnackbarProvider>
  </StrictMode>,
)
