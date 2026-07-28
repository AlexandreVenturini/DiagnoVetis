import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

const DEMO_USERS = [
  { email: 'veterinario@ifes.edu.br', password: 'vet123' },
  { email: 'atendente@ifes.edu.br', password: 'atd123' },
]

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 20v-1.5a6.5 6.5 0 0 1 13 0V20" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4.5" y="10" width="15" height="10.5" rx="1.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validUser = DEMO_USERS.some(
      (user) => user.email === email.trim().toLowerCase() && user.password === password,
    )
    setMessage(
      validUser
        ? 'Login realizado com sucesso!'
        : 'E-mail ou senha incorretos. Confira as credenciais de teste.',
    )
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <header className="brand">
          <div className="brand-mark" aria-hidden="true">
            <span className="dot dot-top" />
            <span className="dot dot-left" />
            <span className="dot dot-center" />
            <span className="dot dot-right" />
          </div>
          <h1 id="login-title">DiagnoVetis</h1>
          <p>IFES Santa Teresa</p>
          <p className="brand-subtitle">Sistema de Gestão Veterinária</p>
        </header>

        <aside className="demo-box" aria-label="Credenciais de teste">
          <p>Credenciais de teste:</p>
          <p><strong>Veterinário:</strong> veterinario@ifes.edu.br / vet123</p>
          <p><strong>Atendente:</strong> atendente@ifes.edu.br / atd123</p>
        </aside>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">E-mail</label>
          <div className="input-wrap">
            <UserIcon />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="seu.email@ifes.edu.br"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <label htmlFor="password">Senha</label>
          <div className="input-wrap">
            <LockIcon />
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {message && (
            <p className={message.startsWith('Login') ? 'form-message success' : 'form-message error'} role="status">
              {message}
            </p>
          )}

          <button className="submit-button" type="submit">Entrar</button>

          <nav className="login-links" aria-label="Opções de acesso">
            <button type="button" onClick={() => setMessage('A recuperação de senha será adicionada em uma próxima etapa.')}>Esqueceu a senha?</button>
            <button type="button" onClick={() => setMessage('O cadastro será adicionado em uma próxima etapa.')}>Criar conta</button>
          </nav>
        </form>

        <footer>
          <p>Sistema de Gerenciamento de Atendimento Veterinário</p>
          <p>IFES - Instituto Federal do Espírito Santo</p>
        </footer>
      </section>
    </main>
  )
}

export default App
