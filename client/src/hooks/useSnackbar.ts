import { useContext } from "react"
import { SnackbarContext } from "../components/SnackbarProvider"

export function useSnackbar() {
  const ctx = useContext(SnackbarContext)
  if (!ctx) throw new Error("SnackbarProvider")
  return ctx
}