import { AppHeader } from './components/AppHeader'
import { ItemList } from './components/ItemList'


export function App() {
  return (
    <div className="p-6 bg-white dark:bg-black min-h-screen w-full transition-colors">
      <AppHeader />
      <ItemList />
    </div>
  )
}
