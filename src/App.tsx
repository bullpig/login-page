import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import AppRoutes from './routes'
import './scss/index.scss'

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
