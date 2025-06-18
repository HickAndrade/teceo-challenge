import { useState } from "react"

export function useSelection<T extends { id: string }>(items: T[]) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const allSelected = items.length > 0 && selectedIds.length === items.length

  function toggleSelect(id: string) {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  function toggleAll() {
    setSelectedIds(allSelected ? [] : items.map(i => i.id))
  }

  function clear() {
    setSelectedIds([])
  }

  return { selectedIds, allSelected, toggleSelect, toggleAll, clear }
}
