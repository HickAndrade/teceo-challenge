import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Item } from "../../types/Item"

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export function useEditItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, values }: { id: string, values: Partial<Item> }) => {
      const res = await fetch(`${API_URL}/items/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      if (!res.ok) throw new Error('Erro ao atualizar item')
      return res.json()
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
  })
}
