import { useState } from 'react'
import { AppHeader } from '../../components/layout/AppHeader'
import { MainNavigation } from '../../components/layout/MainNavigation'
import { DogDetails } from '../dogs/DogDetails'
import { DogForm } from '../dogs/DogForm'
import { DogList } from '../dogs/DogList'
import { INITIAL_DOGS } from '../dogs/dogData'
import type { Dog, DogFormData, DogScreen } from '../dogs/dogTypes'

type VeterinarianDashboardProps = {
  onLogout: () => void
}

export function VeterinarianDashboard({ onLogout }: VeterinarianDashboardProps) {
  const [screen, setScreen] = useState<DogScreen>('list')
  const [dogs, setDogs] = useState(INITIAL_DOGS)
  const [selected, setSelected] = useState<Dog | null>(null)

  function createDog(data: DogFormData) {
    setDogs((current) => [...current, { ...data, id: Date.now() }])
    setScreen('list')
  }

  function editDog(data: DogFormData) {
    if (!selected) return
    setDogs((current) => current.map((dog) => dog.id === selected.id ? { ...data, id: dog.id } : dog))
    setScreen('list')
  }

  function openEdit(dog: Dog) {
    setSelected(dog)
    setScreen('edit')
  }

  function openDetails(dog: Dog) {
    setSelected(dog)
    setScreen('details')
  }

  return (
    <div className="app-shell">
      <AppHeader />
      <main className="shell-width dashboard-content">
        <section className="user-row">
          <div><p>Veterinário(a) logado:</p><strong>veterinario@ifes.edu.br</strong></div>
          <div className="profile-badge"><span>Perfil:</span>Médico Veterinário</div>
          <button className="logout-button" onClick={onLogout}><span>↪</span> Sair</button>
        </section>

        <MainNavigation />

        <aside className="profile-notice">
          <span>♧</span>
          <p><strong>Perfil Veterinário:</strong> Acesso completo a todos os módulos do sistema</p>
        </aside>

        {screen === 'list' && <DogList dogs={dogs} onCreate={() => setScreen('create')} onEdit={openEdit} onDetails={openDetails} />}
        {screen === 'create' && <DogForm onSave={createDog} onCancel={() => setScreen('list')} />}
        {screen === 'edit' && selected && <DogForm dog={selected} editing onSave={editDog} onCancel={() => setScreen('list')} />}
        {screen === 'details' && selected && <DogDetails dog={selected} onBack={() => setScreen('list')} />}
      </main>
    </div>
  )
}
