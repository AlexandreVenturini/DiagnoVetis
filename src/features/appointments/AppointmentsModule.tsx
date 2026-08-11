import { useState } from 'react'
import { AppointmentForm } from './AppointmentForm'
import { AppointmentList } from './AppointmentList'
import { INITIAL_APPOINTMENTS } from './appointmentData'
import type { AppointmentFormData, AppointmentScreen } from './appointmentTypes'

export function AppointmentsModule() {
  const [screen, setScreen] = useState<AppointmentScreen>('list')
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS)
  const [formError, setFormError] = useState('')

  function createAppointment(data: AppointmentFormData) {
    const conflict = data.kind === 'scheduled' && appointments.some((appointment) => appointment.status !== 'cancelled'
      && appointment.veterinarian === data.veterinarian && appointment.date === data.date && appointment.time === data.time)
    if (conflict) {
      setFormError('Este veterinário já possui uma consulta agendada nesse horário.')
      return false
    }
    setAppointments((current) => [...current, { ...data, id: Date.now(), status: 'confirmed', cancellationReason: '', reminders: [] }])
    setFormError('')
    setScreen('list')
    return true
  }

  function updateAppointment(id: number, changes: Partial<(typeof appointments)[number]>) {
    setAppointments((current) => current.map((appointment) => appointment.id === id ? { ...appointment, ...changes } : appointment))
  }

  if (screen === 'create') {
    return <AppointmentForm onSave={createAppointment} onCancel={() => { setFormError(''); setScreen('list') }} error={formError} />
  }

  return <AppointmentList appointments={appointments} onCreate={() => setScreen('create')} onUpdate={updateAppointment} />
}
