import {
  Table, TableHead, TableBody, TableRow, TableCell,
  CircularProgress, TableContainer, Box,
  useTheme
} from "@mui/material"
import { ItemTableRow } from "./ItemTableRow"
import type { Item } from "../types/Item"
import { fields } from "../utils/fieldsTable"
import { Checkbox } from "./ui/Checkbox"


interface ItemTableProps {
  items: Item[]
  selectedIds: string[]
  allSelected: boolean
  onToggleSelect: (id: string) => void
  onToggleAll: () => void
  onSave: (id: string, values: Partial<Item>) => void
  onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void
  isFetchingNextPage: boolean
}

export function ItemTable({
  items,
  selectedIds,
  allSelected,
  onToggleSelect,
  onToggleAll,
  onSave,
  onScroll,
  isFetchingNextPage,
}: ItemTableProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.teceo.main,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        boxShadow: "20px",
        mt: 2,
        mb: 0,
        border: "none",
        overflow: "hidden"
      }}
    >
      <Table stickyHeader size="small" sx={{
        borderRadius: 3,
        background: "transparent",
        minWidth: 650,
      }}>
        <TableHead>

          <TableRow sx={{
            bgcolor: theme.palette.teceoSecondary.main,
            borderRadius: 3,
            "& th:first-of-type": { borderTopLeftRadius: 12 },
            "& th:last-of-type": { borderTopRightRadius: 12 },
          }}>
            <TableCell padding="checkbox" sx={{ bgcolor: theme.palette.teceoSecondary.main, width: 48 }}>
              <Checkbox
                checked={allSelected}
                indeterminate={!!selectedIds.length && !allSelected}
                onChange={onToggleAll}
              />
            </TableCell>
            {fields.map(field => (
              <TableCell
                key={field.key}
                sx={{ width: field.width, color: "white", bgcolor: theme.palette.teceoSecondary.main, fontWeight: 600 }}
              >
                {field.label}
              </TableCell>

            ))}
            <TableCell sx={{ width: 96, color: "white", bgcolor: theme.palette.teceoSecondary.main }} />
          </TableRow>
        </TableHead>
      </Table>

      <TableContainer
        sx={{
          maxHeight: 400,
          overflowY: "auto",
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
        onScroll={onScroll}
      >
        <Table size="small" sx={{ background: "transparent" }}>
          <TableBody>
            {items.map(item => (
              <ItemTableRow
                key={item.id}
                item={item}
                selected={selectedIds.includes(item.id)}
                onToggleSelect={() => onToggleSelect(item.id)}
                onSave={values => onSave(item.id, values)}
                fields={fields}
              />
            ))}
            {isFetchingNextPage && (
              <TableRow>
                <TableCell colSpan={fields.length + 2} align="center">
                  <CircularProgress size={24} sx={{ color: "white" }} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
