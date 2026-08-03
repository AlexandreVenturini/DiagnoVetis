export type AppointmentKind = 'scheduled' | 'walk-in'

export type Appointment = {
  id: number
  kind: AppointmentKind
  dogName: string
  tutorName: string
  date: string
  time: string
  serviceType: string
  veterinarian: string
  notes: string
}

export type AppointmentFormData = Omit<Appointment, 'id'>
export type AppointmentScreen = 'list' | 'create'
