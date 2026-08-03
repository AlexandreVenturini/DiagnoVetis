import type { Appointment, AppointmentFormData } from './appointmentTypes'

export const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 1, kind: 'scheduled', dogName: 'Bob', tutorName: 'João Silva', date: '2026-04-01', time: '09:00', serviceType: 'Consulta de Rotina', veterinarian: 'Dra. Ana Costa', notes: '' },
  { id: 2, kind: 'scheduled', dogName: 'Mia', tutorName: 'Maria Santos', date: '2026-04-01', time: '10:30', serviceType: 'Vacinação', veterinarian: 'Dra. Ana Costa', notes: '' },
]

export const EMPTY_APPOINTMENT: AppointmentFormData = {
  kind: 'scheduled',
  dogName: '',
  tutorName: '',
  date: '',
  time: '',
  serviceType: '',
  veterinarian: '',
  notes: '',
}
