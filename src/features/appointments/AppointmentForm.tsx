import { useState } from 'react'
import type { FormEvent } from 'react'
import { Icon } from '../../components/common/Icon'
import { EMPTY_APPOINTMENT } from './appointmentData'
import type { AppointmentFormData, AppointmentKind } from './appointmentTypes'

type AppointmentFormProps = {
  onSave: (data: AppointmentFormData) => boolean
  onCancel: () => void
  error?: string
}

export function AppointmentForm({ onSave, onCancel, error }: AppointmentFormProps) {
  const [form, setForm] = useState<AppointmentFormData>(EMPTY_APPOINTMENT)

  function update(key: keyof AppointmentFormData, value: string) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function changeKind(kind: AppointmentKind) {
    setForm((current) => ({ ...current, kind, date: kind === 'walk-in' ? '' : current.date, time: kind === 'walk-in' ? '' : current.time }))
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSave(form)
  }

  const scheduled = form.kind === 'scheduled'

  return (
    <section className="content-card appointment-form-card">
      <h2>Agendar Consulta</h2>
      <form className="appointment-form" onSubmit={submit}>
        <fieldset className="appointment-kind full-field">
          <legend>Tipo de Agendamento</legend>
          <div>
            <button className={scheduled ? 'active' : ''} type="button" onClick={() => changeKind('scheduled')}>Agendamento Prévio</button>
            <button className={!scheduled ? 'active' : ''} type="button" onClick={() => changeKind('walk-in')}>Fila de Chegada</button>
          </div>
        </fieldset>

        <label>Nome do Cão<div className="appointment-input-with-icon"><Icon><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></Icon><input value={form.dogName} onChange={(event) => update('dogName', event.target.value)} placeholder="Digite para buscar o cão" required /></div></label>
        <label>Nome do Tutor<input value={form.tutorName} onChange={(event) => update('tutorName', event.target.value)} placeholder="Digite o nome do tutor" required /></label>

        {scheduled && <><label>Data<input type="date" value={form.date} onChange={(event) => update('date', event.target.value)} required /></label><label>Horário<input type="time" value={form.time} onChange={(event) => update('time', event.target.value)} required /></label></>}

        <label className={scheduled ? '' : 'full-field'}>Tipo de Atendimento<select value={form.serviceType} onChange={(event) => update('serviceType', event.target.value)} required><option value="">Selecione</option><option>Consulta de Rotina</option><option>Vacinação</option><option>Retorno</option><option>Emergência</option><option>Exames</option></select></label>
        {scheduled && <div aria-hidden="true" />}
        <label>Veterinário Responsável<input value={form.veterinarian} onChange={(event) => update('veterinarian', event.target.value)} placeholder="Nome do veterinário" required /></label>
        <label>Observações<input value={form.notes} onChange={(event) => update('notes', event.target.value)} placeholder="Observações sobre o agendamento" /></label>

        {error && <p className="form-message error full-field" role="alert">{error}</p>}
        <div className="form-actions full-field">
          <button className="primary-button" type="submit">Confirmar Agendamento</button>
          <button className="secondary-button" type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </section>
  )
}
