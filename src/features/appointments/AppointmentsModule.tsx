import { useState } from 'react'
import { AppointmentForm } from './AppointmentForm'
import { AppointmentList } from './AppointmentList'
import { INITIAL_APPOINTMENTS } from './appointmentData'
import type { AppointmentFormData, AppointmentScreen } from './appointmentTypes'

export function AppointmentsModule() {
  const [screen, setScreen] = useState<AppointmentScreen>('list')
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS)

  function createAppointment(data: AppointmentFormData) {
    setAppointments((current) => [...current, { ...data, id: Date.now() }])
    setScreen('list')
  }

  if (screen === 'create') {
    return <AppointmentForm onSave={createAppointment} onCancel={() => setScreen('list')} />
  }

  return <AppointmentList appointments={appointments} onCreate={() => setScreen('create')} />
}
