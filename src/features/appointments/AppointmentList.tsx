import { Icon } from '../../components/common/Icon'
import type { Appointment } from './appointmentTypes'

type AppointmentListProps = {
  appointments: Appointment[]
  onCreate: () => void
}

function formatDate(date: string) {
  if (!date) return 'Fila de chegada'
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

export function AppointmentList({ appointments, onCreate }: AppointmentListProps) {
  return (
    <section className="appointment-list">
      <div className="section-heading appointment-title-row">
        <h2>Agenda de Consultas</h2>
        <button className="primary-button new-button" onClick={onCreate}>
          <Icon><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></Icon>
          Novo Agendamento
        </button>
      </div>

      <div className="agenda-grid">
        <div className="upcoming-column">
          <h3>Próximas Consultas</h3>
          <div className="appointment-cards">
            {appointments.length === 0 && <div className="empty-appointments">Nenhuma consulta agendada</div>}
            {appointments.map((appointment) => (
              <article className="appointment-card" key={appointment.id}>
                <div>
                  <strong>{appointment.dogName}</strong>
                  <p>Tutor: {appointment.tutorName}</p>
                  <div className="appointment-meta">
                    <span>▣ {formatDate(appointment.date)}</span>
                    <span>◷ {appointment.time || 'Ordem de chegada'}</span>
                  </div>
                </div>
                <span className="service-label">{appointment.serviceType}</span>
              </article>
            ))}
          </div>
        </div>

        <aside className="today-column">
          <h3>Consultas de Hoje</h3>
          <div className="today-empty"><span>✓</span><p>Nenhuma consulta hoje</p></div>
          <div className="schedule-info">
            <strong>Horários Disponíveis</strong>
            <p>Segunda a Sexta: 8h às 18h</p>
            <p>Sábado: 8h às 12h</p>
            <small>Intervalo para almoço: 12h às 14h</small>
          </div>
        </aside>
      </div>
    </section>
  )
}
