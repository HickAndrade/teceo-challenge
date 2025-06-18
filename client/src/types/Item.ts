import type { JSX } from "react/jsx-runtime"

export interface Item {
  map(arg0: (item: any, idx: any) => JSX.Element): any
  length: number
  id: string
  name: string
  type: string
  size: string
  color: string
  quantity: number
  status: 'success' | 'error' | 'loading'
  createdAt: string
}

export interface FindAllItemsResponse {
  items: Item[]
  total: number
  totalSuccess: number
  totalError: number
}