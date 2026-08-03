import { useState } from 'react'
import type { FormEvent } from 'react'
import { EMPTY_DOG } from './dogData'
import type { Dog, DogFormData } from './dogTypes'

type DogFormProps = {
  dog?: Dog
  editing?: boolean
  onSave: (data: DogFormData) => void
  onCancel: () => void
}

export function DogForm({ dog, editing = false, onSave, onCancel }: DogFormProps) {
  const [form, setForm] = useState<DogFormData>(dog ? { ...dog } : EMPTY_DOG)

  function update(key: keyof DogFormData, value: string) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSave(form)
  }

  return (
    <section className="content-card form-card">
      <h2>{editing ? 'Editar Cão' : 'Cadastrar Novo Cão'}</h2>
      <form className="dog-form" onSubmit={submit}>
        <label>Nome do Cão<input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Ex: Bob" required /></label>
        <label>Raça<select value={form.breed} onChange={(event) => update('breed', event.target.value)} required><option value="">Selecione a raça</option><option>Labrador</option><option>Pastor Alemão</option><option>Golden Retriever</option><option>Poodle</option><option>Vira-lata</option></select></label>
        <label>Idade (anos)<input type="number" min="0" value={form.age} onChange={(event) => update('age', event.target.value)} placeholder="Ex: 3" required /></label>
        <label>Peso (kg)<input type="number" min="0" step="0.1" value={form.weight} onChange={(event) => update('weight', event.target.value)} placeholder="Ex: 28" required /></label>
        <label>Sexo<select value={form.sex} onChange={(event) => update('sex', event.target.value)} required><option value="">Selecione</option><option>Macho</option><option>Fêmea</option></select></label>
        <label>Nome do Tutor<input value={form.tutor} onChange={(event) => update('tutor', event.target.value)} placeholder="Ex: João Silva" required /></label>
        <label>Contato do Tutor<input value={form.contact} onChange={(event) => update('contact', event.target.value)} placeholder="(27) 99999-9999" required /></label>
        <label className="full-field">Histórico de Saúde<textarea value={form.history} onChange={(event) => update('history', event.target.value)} placeholder="Informações relevantes sobre o histórico de saúde do cão..." /></label>
        <div className="form-actions full-field">
          <button className="primary-button" type="submit">{editing ? 'Salvar Alterações' : 'Cadastrar Cão'}</button>
          <button className="secondary-button" type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </section>
  )
}
