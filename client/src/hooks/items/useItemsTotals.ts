import type { FindAllItemsResponse } from "../../types/Item";


export function useItemsTotals(data: FindAllItemsResponse[] | undefined) {
  return {
    totalConcluidos: data?.[0]?.totalSuccess ?? 0,
    totalErros: data?.[0]?.totalError ?? 0,
    totalGeral: data?.[0]?.total ?? 0,
  }
}
