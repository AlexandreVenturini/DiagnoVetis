import { useState, useCallback } from 'react'
import type { Appointment, AppointmentFormData } from '../features/appointments/appointmentTypes'

const STORAGE_KEY = 'diagnovetis:appointments'

function loadFromStorage(): Appointment[] {
    if (typeof localStorage === 'undefined') return []
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? (JSON.parse(raw) as Appointment[]) : []
    } catch {
        return []
    }
}

function saveToStorage(appointments: Appointment[]): void {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))
}

export function useAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>(loadFromStorage)

    const persist = useCallback((updated: Appointment[]) => {
        saveToStorage(updated)
        setAppointments(updated)
    }, [])

    const createAppointment = useCallback((data: AppointmentFormData): boolean => {
        const current = loadFromStorage()

        const conflict = data.kind === 'scheduled' && current.some(
            a => a.status !== 'cancelled'
                && a.veterinarian === data.veterinarian
                && a.date === data.date
                && a.time === data.time
        )
        if (conflict) return false

        const novo: Appointment = {
            ...data,
            id: Date.now(),
            status: 'confirmed',
            cancellationReason: '',
            reminders: [],
        }
        persist([...current, novo])
        return true
    }, [persist])

    const updateAppointment = useCallback((id: number, changes: Partial<Appointment>) => {
        const current = loadFromStorage()
        const updated = current.map(a => a.id === id ? { ...a, ...changes } : a)
        persist(updated)
    }, [persist])

    return { appointments, createAppointment, updateAppointment }
}
