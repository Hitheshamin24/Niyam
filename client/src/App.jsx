import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Habit Tracker
          </h1>
          <p className="text-gray-500 text-lg mb-6">
            Your personal habit tracking app
          </p>
          <div className="bg-habit-green text-green-700 px-6 py-3 rounded-full inline-block font-medium">
            Vite + React + Tailwind v4 working!
          </div>
        </div>
      </div>
    </div>
  )
}

export default App