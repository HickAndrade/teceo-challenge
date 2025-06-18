import { Box, Typography, CircularProgress, useTheme } from "@mui/material"
import { useItemsInfiniteScroll } from "../hooks/useItemsInfiniteScroll"
import { useSelection } from "../hooks/useSelection"
import { BulkActionModal } from "./BulkActionModal"
import { ItemTable } from "./ItemTable"
import type { Item } from "../types/Item"
import { useState } from "react"
import { useSnackbar } from "../hooks/useSnackbar"
import { useItemsTotals } from "../hooks/items/useItemsTotals"
import { useEditItem } from "../hooks/items/useEditItem"
import { Button } from "./ui/Button"
import { exportItemsToCSV } from "../utils/exportItemsToCSV"

export function ItemList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useItemsInfiniteScroll();
  const items = data?.pages.flatMap(page => page.items) ?? []
  const { totalConcluidos, totalErros, totalGeral } = useItemsTotals(data?.pages);
  const selection = useSelection(items);
  const [isBulkModalOpen, setBulkModalOpen] = useState(false);
  const { mutateAsync: updateItem } = useEditItem();
  const { show } = useSnackbar();
  const theme = useTheme();


  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight
    if (bottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  function handleBulkAction() {
    setBulkModalOpen(true)
  }

  function handleBulkConfirm(success: boolean) {
    setBulkModalOpen(false)
    selection.clear()
    show(success ? "Alteração em massa concluída." : "Erro ao atualizar itens.", success ? "success" : "error")
  }

  async function handleSaveRow(id: string, values: Partial<Item>) {
    try {
      await updateItem({ id, values })
      show("Item atualizado com sucesso!", "success")
    } catch {
      show("Erro ao atualizar item.", "error")
    }
  }

  return (
    <Box>
      <BulkActionModal
        open={isBulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
        items={items.filter(i => selection.selectedIds.includes(i.id))}
        onConfirm={handleBulkConfirm}
      />

      {status === "pending" && <CircularProgress />}
      {status === "error" && <div>Erro ao carregar itens</div>}

      <ItemTable
        items={items}
        selectedIds={selection.selectedIds}
        allSelected={selection.allSelected}
        onToggleSelect={selection.toggleSelect}
        onToggleAll={selection.toggleAll}
        onSave={handleSaveRow}
        onScroll={handleScroll}
        isFetchingNextPage={isFetchingNextPage}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          bgcolor: theme.palette.teceoSecondary.dark,
          color: "teceo.contrastText",
          py: "18px",
          px: "20px",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          boxShadow: 2
        }}
      >
        <Typography color="success" sx={{ fontWeight: 500 }}>
          {totalConcluidos} itens concluídos
        </Typography>
        <Typography color="error" sx={{ fontWeight: 500 }}>
          {totalErros} itens com Erro
        </Typography>
        <Typography sx={{ color: "teceo.contrastText", fontWeight: 500 }}>
          {totalGeral} Total de itens
        </Typography>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mr: 2, color: "teceo.contrastText", borderColor: "teceo.contrastText" }}
            disabled={selection.selectedIds.length === 0}
            onClick={() => exportItemsToCSV(items.filter(i => selection.selectedIds.includes(i.id)), "itens.csv")}
          >
            Exportar
          </Button>
          <Button
            variant="contained"
            disabled={selection.selectedIds.length === 0}
            onClick={handleBulkAction}
          >
            {selection.selectedIds.length === 0
              ? "Nenhum item selecionado"
              : `(${selection.selectedIds.length}) ${selection.selectedIds.length === 1 ? "Item" : "Itens"} 
      selecionado${selection.selectedIds.length === 1 ? "" : "s"}`}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
