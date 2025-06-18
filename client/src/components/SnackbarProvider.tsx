import { createContext, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'

type SnackbarContextType = {
  show: (message: string, severity?: "success" | "error") => void
  close: () => void
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined)

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: "success" | "error"
  }>({ open: false, message: "", severity: "success" })

  const show = (message: string, severity: "success" | "error" = "success") =>
    setSnackbar({ open: true, message, severity })
  const close = () => setSnackbar(s => ({ ...s, open: false }))

  return (
    <SnackbarContext.Provider value={{ show, close }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={close}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}


