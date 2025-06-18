import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  List, ListItem, ListItemText, Select, MenuItem, TextField,
  CircularProgress
} from "@mui/material"
import { useState } from "react"
import { useBulkUpdate } from "../hooks/items/useBulkUpdate"
import type { Item } from "../types/Item";
import { Button } from "./ui/Button";

type BulkValues = {
  status: string
  quantity: string
  size: string
}

interface BulkActionModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (success: boolean) => void
  items: Item[]
}

export function BulkActionModal({ open, onClose, onConfirm, items }: BulkActionModalProps) {
  const [bulkValues, setBulkValues] = useState<BulkValues>({ status: "", quantity: "", size: "" })
  const { mutateAsync, isPending } = useBulkUpdate()

  function handleFieldChange(field: keyof BulkValues, value: string) {
    setBulkValues(v => ({ ...v, [field]: value }))
  }

  async function handleBulk() {
    const data: Partial<Item> = {}
    if (bulkValues.status) data.status = bulkValues.status as Item['status']
    if (bulkValues.quantity) data.quantity = Number(bulkValues.quantity)
    if (bulkValues.size) data.size = bulkValues.size

     try {
        await mutateAsync({ ids: items.map(i => i.id), data })
        onConfirm(true)
    } catch {
    onConfirm(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Prévia dos Itens Selecionados</DialogTitle>
      <DialogContent dividers>
        <List sx={{
        maxHeight: 340,
        overflowY: "auto",
        p: 0,
    }}>
          {items.map(item => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} secondary={`Status: ${item.status}`} />
            </ListItem>
          ))}
        </List>
        <Select
          fullWidth
          value={bulkValues.status}
          onChange={e => handleFieldChange("status", e.target.value)}
          sx={{ mt: 2 }}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Selecione o novo status
          </MenuItem>
          <MenuItem value="success">Concluída</MenuItem>
          <MenuItem value="error">Erro</MenuItem>
        </Select>
        <TextField
          fullWidth
          type="number"
          label="Nova quantidade"
          value={bulkValues.quantity}
          onChange={e => handleFieldChange("quantity", e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Novo tamanho"
          value={bulkValues.size}
          onChange={e => handleFieldChange("size", e.target.value)}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary" disabled={isPending}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBulk}
          disabled={
            isPending ||
            (!bulkValues.status && !bulkValues.quantity && !bulkValues.size)
          }
        >
          {isPending ? <CircularProgress size={20} color="inherit" />: "Executar ação"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
