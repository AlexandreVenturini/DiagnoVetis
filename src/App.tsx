import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import './App.css'

type Screen = 'list' | 'create' | 'edit' | 'details'

type Dog = {
  id: number
  name: string
  breed: string
  age: string
  weight: string
  sex: string
  tutor: string
  contact: string
  history: string
}

const INITIAL_DOGS: Dog[] = [
  { id: 1, name: 'Bob', breed: 'Labrador', age: '3', weight: '28', sex: 'Macho', tutor: 'João Silva', contact: '(27) 99999-0001', history: 'Vacinação em dia' },
  { id: 2, name: 'Rex', breed: 'Pastor Alemão', age: '5', weight: '35', sex: 'Macho', tutor: 'Maria Santos', contact: '(27) 98888-0002', history: 'Acompanhamento anual em dia' },
]

const EMPTY_DOG: Omit<Dog, 'id'> = {
  name: '', breed: '', age: '', weight: '', sex: '', tutor: '', contact: '', history: '',
}

function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <span className="dot dot-top" /><span className="dot dot-left" />
      <span className="dot dot-center" /><span className="dot dot-right" />
    </div>
  )
}

function Icon({ children }: { children: ReactNode }) {
  return <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true">{children}</svg>
}

function Login({ onLogin, onCreateAccount }: { onLogin: () => void; onCreateAccount: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim().toLowerCase() === 'veterinario@ifes.edu.br' && password === 'vet123') onLogin()
    else setMessage('Use as credenciais do veterinário para acessar este módulo.')
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <header className="login-brand">
          <BrandMark />
          <h1 id="login-title">DiagnoVetis</h1>
          <p>IFES Santa Teresa</p>
          <p className="brand-subtitle">Sistema de Gestão Veterinária</p>
        </header>
        <aside className="demo-box" aria-label="Credenciais de teste">
          <p>Credenciais de teste:</p>
          <p><strong>Veterinário:</strong> veterinario@ifes.edu.br / vet123</p>
          <p><strong>Atendente:</strong> atendente@ifes.edu.br / atd123</p>
        </aside>
        <form onSubmit={submit}>
          <label htmlFor="email">E-mail</label>
          <div className="input-wrap">
            <Icon><circle cx="12" cy="8" r="3.25" /><path d="M5.5 20v-1.5a6.5 6.5 0 0 1 13 0V20" /></Icon>
            <input id="email" type="email" autoComplete="email" placeholder="seu.email@ifes.edu.br" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>
          <label htmlFor="password">Senha</label>
          <div className="input-wrap">
            <Icon><rect x="4.5" y="10" width="15" height="10.5" rx="1.5" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></Icon>
            <input id="password" type="password" autoComplete="current-password" placeholder="Digite sua senha" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </div>
          {message && <p className="form-message error" role="status">{message}</p>}
          <button className="submit-button" type="submit">Entrar</button>
          <nav className="login-links" aria-label="Opções de acesso"><button type="button">Esqueceu a senha?</button><button type="button" onClick={onCreateAccount}>Criar conta</button></nav>
        </form>
        <footer><p>Sistema de Gerenciamento de Atendimento Veterinário</p><p>IFES - Instituto Federal do Espírito Santo</p></footer>
      </section>
    </main>
  )
}

function Register({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSuccess(false)

    if (!email.trim().toLowerCase().endsWith('@ifes.edu.br')) {
      setMessage('Informe um e-mail institucional válido do IFES.')
      return
    }
    if (password.length < 6) {
      setMessage('A senha deve ter pelo menos 6 caracteres.')
      return
    }
    if (password !== confirmation) {
      setMessage('As senhas informadas não coincidem.')
      return
    }

    setSuccess(true)
    setMessage(`Cadastro de ${name.trim()} realizado com sucesso!`)
  }

  return (
    <main className="register-page">
      <section className="register-card" aria-labelledby="register-title">
        <header className="register-brand">
          <BrandMark />
          <h1 id="register-title">DiagnoVetis</h1>
          <p>IFES Santa Teresa</p>
          <p className="brand-subtitle">Cadastro de Acesso</p>
        </header>

        <form className="register-form" onSubmit={submit}>
          <label htmlFor="full-name">Nome Completo</label>
          <div className="input-wrap">
            <Icon><circle cx="12" cy="8" r="3.25" /><path d="M5.5 20v-1.5a6.5 6.5 0 0 1 13 0V20" /></Icon>
            <input id="full-name" type="text" autoComplete="name" placeholder="Seu nome completo" value={name} onChange={(event) => setName(event.target.value)} required />
          </div>

          <label htmlFor="register-email">E-mail</label>
          <div className="input-wrap">
            <Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></Icon>
            <input id="register-email" type="email" autoComplete="email" placeholder="seu.email@ifes.edu.br" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>

          <label htmlFor="register-password">Senha</label>
          <div className="input-wrap">
            <Icon><rect x="4.5" y="10" width="15" height="10.5" rx="1.5" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></Icon>
            <input id="register-password" type="password" autoComplete="new-password" placeholder="Crie sua senha" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} />
          </div>

          <label htmlFor="confirm-password">Confirmar Senha</label>
          <div className="input-wrap">
            <Icon><rect x="4.5" y="10" width="15" height="10.5" rx="1.5" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></Icon>
            <input id="confirm-password" type="password" autoComplete="new-password" placeholder="Repita sua senha" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} required minLength={6} />
          </div>

          {message && <p className={`register-message ${success ? 'success' : 'error'}`} role="status">{message}</p>}
          <button className="submit-button" type="submit">Cadastrar</button>
        </form>

        <button className="back-to-login" type="button" onClick={onBack}>Já tem conta? <strong>Faça login</strong></button>
      </section>
    </main>
  )
}

const menuItems = [
  ['Cadastro', 'paw'], ['Agendamento', 'calendar'], ['Atendimento', 'stethoscope'],
  ['Prontuários', 'file'], ['Zoonoses', 'database'], ['Medicamentos', 'pill'], ['Dashboard', 'chart'],
]

function MenuIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    paw: <><circle cx="7" cy="6" r="2" /><circle cx="15" cy="5" r="2" /><circle cx="18" cy="11" r="2" /><path d="M7 13c2-4 8-2 9 2 1 4-3 5-5 3-2 2-6 0-4-5Z" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></>,
    stethoscope: <><path d="M5 3v6a5 5 0 0 0 10 0V3m-12 0h4m6 0h4m-7 11v2a4 4 0 0 0 8 0v-2" /><circle cx="18" cy="12" r="2" /></>,
    file: <><path d="M6 3h8l4 4v14H6zM14 3v5h5M9 12h6m-6 4h6" /></>,
    database: <><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5m-14 7v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" /></>,
    pill: <><path d="M8.5 19.5a5 5 0 0 1-7-7l7-7a5 5 0 0 1 7 7zM6 8l7 7" /></>,
    chart: <><path d="M4 20V10m6 10V4m6 16v-7m5 7H2" /></>,
  }
  return <Icon>{paths[name]}</Icon>
}

function DogForm({ dog, editing, onSave, onCancel }: { dog?: Dog; editing?: boolean; onSave: (data: Omit<Dog, 'id'>) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Omit<Dog, 'id'>>(dog ? { ...dog } : EMPTY_DOG)
  const update = (key: keyof Omit<Dog, 'id'>, value: string) => setForm((current) => ({ ...current, [key]: value }))
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); onSave(form) }

  return (
    <section className="content-card form-card">
      <h2>{editing ? 'Editar Cão' : 'Cadastrar Novo Cão'}</h2>
      <form className="dog-form" onSubmit={submit}>
        <label>Nome do Cão<input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Ex: Bob" required /></label>
        <label>Raça<select value={form.breed} onChange={(e) => update('breed', e.target.value)} required><option value="">Selecione a raça</option><option>Labrador</option><option>Pastor Alemão</option><option>Golden Retriever</option><option>Poodle</option><option>Vira-lata</option></select></label>
        <label>Idade (anos)<input type="number" min="0" value={form.age} onChange={(e) => update('age', e.target.value)} placeholder="Ex: 3" required /></label>
        <label>Peso (kg)<input type="number" min="0" step="0.1" value={form.weight} onChange={(e) => update('weight', e.target.value)} placeholder="Ex: 28" required /></label>
        <label>Sexo<select value={form.sex} onChange={(e) => update('sex', e.target.value)} required><option value="">Selecione</option><option>Macho</option><option>Fêmea</option></select></label>
        <label>Nome do Tutor<input value={form.tutor} onChange={(e) => update('tutor', e.target.value)} placeholder="Ex: João Silva" required /></label>
        <label>Contato do Tutor<input value={form.contact} onChange={(e) => update('contact', e.target.value)} placeholder="(27) 99999-9999" required /></label>
        <label className="full-field">Histórico de Saúde<textarea value={form.history} onChange={(e) => update('history', e.target.value)} placeholder="Informações relevantes sobre o histórico de saúde do cão..." /></label>
        <div className="form-actions full-field"><button className="primary-button" type="submit">{editing ? 'Salvar Alterações' : 'Cadastrar Cão'}</button><button className="secondary-button" type="button" onClick={onCancel}>Cancelar</button></div>
      </form>
    </section>
  )
}

function DogDetails({ dog, onBack }: { dog: Dog; onBack: () => void }) {
  const item = (label: string, value: string) => <div className="detail-item"><span>{label}</span><strong>{value}</strong></div>
  return <section className="content-card details-card"><div className="section-heading"><h2>Detalhes do Cão</h2><button className="secondary-button" onClick={onBack}>Voltar</button></div><div className="details-grid">{item('Nome', dog.name)}{item('Espécie', 'Cão')}{item('Raça', dog.breed)}{item('Idade', `${dog.age} anos`)}{item('Peso', `${dog.weight} kg`)}{item('Sexo', dog.sex)}{item('Tutor', dog.tutor)}{item('Contato', dog.contact)}<div className="detail-item detail-history"><span>Histórico de Saúde</span><strong>{dog.history || 'Não informado'}</strong></div></div></section>
}

function DogList({ dogs, onCreate, onEdit, onDetails }: { dogs: Dog[]; onCreate: () => void; onEdit: (dog: Dog) => void; onDetails: (dog: Dog) => void }) {
  return <section className="dog-list"><div className="section-heading"><h2>Cães Cadastrados</h2><button className="primary-button new-button" onClick={onCreate}><span>＋</span> Novo Cadastro</button></div><div className="dog-grid">{dogs.map((dog) => <article className="dog-card" key={dog.id}><div className="dog-card-heading"><h3>{dog.name}</h3><div className="card-actions"><button aria-label={`Ver detalhes de ${dog.name}`} onClick={() => onDetails(dog)}><Icon><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></Icon></button><button aria-label={`Editar ${dog.name}`} onClick={() => onEdit(dog)}><Icon><path d="m4 16-1 5 5-1L19 9l-4-4zM13.5 6.5l4 4" /></Icon></button></div></div><p className="breed">{dog.breed}</p><p>Idade: {dog.age} anos</p><p>Peso: {dog.weight} kg</p><p>Tutor: {dog.tutor}</p></article>)}</div></section>
}

function VeterinarianArea({ onLogout }: { onLogout: () => void }) {
  const [screen, setScreen] = useState<Screen>('list')
  const [dogs, setDogs] = useState(INITIAL_DOGS)
  const [selected, setSelected] = useState<Dog | null>(null)

  const createDog = (data: Omit<Dog, 'id'>) => { setDogs((current) => [...current, { ...data, id: Date.now() }]); setScreen('list') }
  const editDog = (data: Omit<Dog, 'id'>) => { if (!selected) return; setDogs((current) => current.map((dog) => dog.id === selected.id ? { ...data, id: dog.id } : dog)); setScreen('list') }

  return <div className="app-shell"><header className="topbar"><div className="shell-width header-brand"><BrandMark /><div><strong>DiagnoVetis</strong><span>IFES Santa Teresa</span></div></div></header><main className="shell-width dashboard-content"><section className="user-row"><div><p>Veterinário(a) logado:</p><strong>veterinario@ifes.edu.br</strong></div><div className="profile-badge"><span>Perfil:</span>Médico Veterinário</div><button className="logout-button" onClick={onLogout}><span>↪</span> Sair</button></section><nav className="main-nav" aria-label="Módulos do sistema">{menuItems.map(([label, icon]) => <button className={label === 'Cadastro' ? 'active' : ''} key={label}><MenuIcon name={icon} />{label}</button>)}</nav><aside className="profile-notice"><span>♧</span><p><strong>Perfil Veterinário:</strong> Acesso completo a todos os módulos do sistema</p></aside>{screen === 'list' && <DogList dogs={dogs} onCreate={() => setScreen('create')} onEdit={(dog) => { setSelected(dog); setScreen('edit') }} onDetails={(dog) => { setSelected(dog); setScreen('details') }} />}{screen === 'create' && <DogForm onSave={createDog} onCancel={() => setScreen('list')} />}{screen === 'edit' && selected && <DogForm dog={selected} editing onSave={editDog} onCancel={() => setScreen('list')} />}{screen === 'details' && selected && <DogDetails dog={selected} onBack={() => setScreen('list')} />}</main></div>
}

function App() {
  const [authScreen, setAuthScreen] = useState<'login' | 'register' | 'app'>('login')

  if (authScreen === 'app') return <VeterinarianArea onLogout={() => setAuthScreen('login')} />
  if (authScreen === 'register') return <Register onBack={() => setAuthScreen('login')} />
  return <Login onLogin={() => setAuthScreen('app')} onCreateAccount={() => setAuthScreen('register')} />
}

export default App
