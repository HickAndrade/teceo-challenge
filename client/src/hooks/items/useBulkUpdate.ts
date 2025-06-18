import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Item } from "../../types/Item"

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export function useBulkUpdate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ ids, data }: { ids: string[], data: Partial<Item> }) => {
      const res = await fetch(`${API_URL}/items/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids, data }),
      })
      if (!res.ok) throw new Error('Erro ao atualizar itens')
      return res.json()
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
  })
}
