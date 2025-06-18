import { useInfiniteQuery, type QueryFunctionContext } from '@tanstack/react-query'
import type { FindAllItemsResponse } from '../types/Item'

const LIMIT = 20
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

async function fetchItems(ctx: QueryFunctionContext): Promise<FindAllItemsResponse> {
  const { pageParam = 0, signal } = ctx
  
  const offset = typeof pageParam === 'number' ? pageParam : 0
  const res = await fetch(`${API_URL}/items?offset=${offset}&limit=${LIMIT}`, { signal })
  
  if (!res.ok) throw new Error('Erro ao buscar itens')
  return res.json()
}


export function useItemsInfiniteScroll() {
  return useInfiniteQuery<FindAllItemsResponse>({
    queryKey: ['items'],
    queryFn: fetchItems,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.items.length === LIMIT ? allPages.length * LIMIT : undefined,
  })
}
