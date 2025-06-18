import { useState } from "react"
import {
  TableRow, TableCell, IconButton, TextField, Typography, Select, MenuItem
} from "@mui/material"
import { Edit as EditIcon, Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material"
import type { Item } from "../types/Item"
import type { fields } from "../utils/fieldsTable"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import { Checkbox } from "./ui/Checkbox"

type Field = typeof fields[number]

interface ItemTableRowProps {
  item: Item
  selected: boolean
  onToggleSelect: () => void
  onSave: (values: Partial<Item>) => void
  fields: readonly Field[]
}

export function ItemTableRow({ item, selected, onToggleSelect, onSave, fields }: ItemTableRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValues, setEditValues] = useState({ ...item })

  function handleEdit() { setIsEditing(true) }
  function handleCancel() { setIsEditing(false); setEditValues({ ...item }) }
  function handleSave() { onSave(editValues); setIsEditing(false) }
  function withStopPropagation(fn: (e: React.MouseEvent<any, any>) => void) {
    return (e: React.MouseEvent<any, any>) => {
      e.stopPropagation()
      fn(e)
    }
  }

  return (
    <TableRow
      hover
      onClick={onToggleSelect}
      sx={{
        cursor: "pointer",
        transition: "background 0.2s",
        '&:hover': { backgroundColor: "teceo.light" }
      }}
    >
      <TableCell padding="checkbox" onClick={e => e.stopPropagation()}>
        <Checkbox checked={selected} onChange={onToggleSelect} />
      </TableCell>

      {fields.map(field => (
        <TableCell key={field.key} sx={{ width: field.width }}>
          {isEditing && field.type === "select" ? (
            <Select
              value={editValues.status ?? item.status}
              size="small"
              fullWidth
              onClick={e => e.stopPropagation()}
              onChange={e =>
                setEditValues(v => ({ ...v, status: e.target.value }))
              }
              sx={{
                maxWidth: field.width,
                minWidth: 0,
                "& .MuiSelect-select": {
                  p: "6px 16px"
                }
              }}
            >
              <MenuItem value="success">Concluída</MenuItem>
              <MenuItem value="error">Erro</MenuItem>
            </Select>
          ) : field.key === "status" ? (
            item.status === "success" ? (
              <Typography color="green" sx={{ fontWeight: 'bold', alignItems: 'center', display: 'flex', fontSize: 14 }}>
                <CheckCircleIcon sx={{ color: 'success.main', mr: 1, mb: 0.3 }} fontSize="small" />
                Concluída
              </Typography>
            ) : (
              <Typography color="red" sx={{ fontWeight: 'bold', alignItems: 'center', display: 'flex', fontSize: 14 }}>
                <ErrorIcon sx={{ color: 'error.main', mr: 1, mb: 0.3 }} fontSize="small" />
                Erro
              </Typography>
            )
          ) : isEditing ? (
            <TextField
              value={editValues[field.key]}
              type={field.type}
              size="small"
              fullWidth
              onClick={e => e.stopPropagation()}
              onChange={e =>
                setEditValues(v => ({
                  ...v,
                  [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value
                }))
              }
            />
          ) : (
            item[field.key]
          )}
        </TableCell>
      ))}

      <TableCell sx={{ width: 96 }}>
        {isEditing ? (
          <>
            <IconButton onClick={withStopPropagation(() => handleSave())}>
              <CheckIcon />
            </IconButton>
            <IconButton onClick={withStopPropagation(() => handleCancel())}>
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={withStopPropagation(() => handleEdit())}>
            <EditIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  )
}
