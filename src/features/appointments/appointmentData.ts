import type { Appointment, AppointmentFormData } from './appointmentTypes'

export const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 1, kind: 'scheduled', dogName: 'Bob', tutorName: 'João Silva', date: '2026-08-11', time: '09:00', serviceType: 'Consulta de Rotina', veterinarian: 'Dra. Ana Costa', notes: '', status: 'confirmed', cancellationReason: '', reminders: [{ id: 11, type: 'return', date: '2026-09-11', done: false }] },
  { id: 2, kind: 'scheduled', dogName: 'Mia', tutorName: 'Maria Santos', date: '2026-08-12', time: '10:30', serviceType: 'Vacinação', veterinarian: 'Dra. Ana Costa', notes: '', status: 'confirmed', cancellationReason: '', reminders: [{ id: 21, type: 'vaccination', date: '2027-08-12', done: false }] },
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
