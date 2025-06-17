import { useThemeContext } from './providers/ThemeContextProvider'

export function App() {
  const { toggleTheme, mode } = useThemeContext()

  return (
    <div className="p-6 dark:bg-green-200 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Teceo Challenge</h1>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Toggle Theme {mode}
      </button>
    </div>
  )
}
