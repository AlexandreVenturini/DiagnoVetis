import type { AppointmentFormData } from './appointmentTypes'

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
