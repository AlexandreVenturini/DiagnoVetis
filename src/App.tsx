import { useState } from 'react'
import { LoginPage } from './features/auth/LoginPage'
import { RegisterPage } from './features/auth/RegisterPage'
import { VeterinarianDashboard } from './features/veterinarian/VeterinarianDashboard'
import './App.css'

type AppScreen = 'login' | 'register' | 'dashboard'

function App() {
  const [screen, setScreen] = useState<AppScreen>('login')

  if (screen === 'dashboard') {
    return <VeterinarianDashboard onLogout={() => setScreen('login')} />
  }

  if (screen === 'register') {
    return <RegisterPage onBack={() => setScreen('login')} />
  }

  return (
    <LoginPage
      onLogin={() => setScreen('dashboard')}
      onCreateAccount={() => setScreen('register')}
    />
  )
}

export default App
