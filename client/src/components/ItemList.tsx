import { Box, CircularProgress } from "@mui/material"
import { useItemsInfiniteScroll } from "../hooks/useItemsInfiniteScroll"
import { useSelection } from "../hooks/useSelection"
import { BulkActionModal } from "./BulkActionModal"
import { ItemTable } from "./ItemTable"
import type { Item } from "../types/Item"
import { useState } from "react"
import { useSnackbar } from "../hooks/useSnackbar"
import { useItemsTotals } from "../hooks/items/useItemsTotals"
import { useEditItem } from "../hooks/items/useEditItem"
import { exportItemsToCSV } from "../utils/exportItemsToCSV"
import { TotalizerFooter } from "./TotalizeFooter"

export function ItemList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useItemsInfiniteScroll();
  const items = data?.pages.flatMap(page => page.items) ?? []
  const { totalConcluidos, totalErros, totalGeral } = useItemsTotals(data?.pages);
  const selection = useSelection(items);
  const [isBulkModalOpen, setBulkModalOpen] = useState(false);
  const { mutateAsync: updateItem } = useEditItem();
  const { show } = useSnackbar();

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

      {status === "pending" && <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="40vh"
        width="100%"
      >
        <CircularProgress />
      </Box>}
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
     <TotalizerFooter
        totalConcluidos={totalConcluidos}
        totalErros={totalErros}
        totalGeral={totalGeral}
        numSelecionados={selection.selectedIds.length}
        onExport={() =>
          exportItemsToCSV(
            items.filter(i => selection.selectedIds.includes(i.id)),
            "itens.csv"
          )
        }
        onBulk={handleBulkAction}
      />
    </Box>
  )
}
