import type { ConsultationData } from '../consultationTypes'

type IdentificationStepProps = {
  data: ConsultationData
  update: (key: keyof ConsultationData, value: string) => void
  onNext: () => void
}

export function IdentificationStep({ data, update, onNext }: IdentificationStepProps) {
  const complete = data.dogName && data.age && data.breed && data.tutorName && data.veterinarian

  return (
    <section className="consultation-panel content-card">
      <h2>1. Identificação do Paciente</h2>
      <div className="consultation-form-grid">
        <label>Nome do Cão *<input value={data.dogName} onChange={(event) => update('dogName', event.target.value)} placeholder="Ex: Rex" /></label>
        <label>Idade *<input value={data.age} onChange={(event) => update('age', event.target.value)} placeholder="Ex: 5 anos" /></label>
        <label>Raça *<select value={data.breed} onChange={(event) => update('breed', event.target.value)}><option value="">Selecione a raça</option><option>Labrador</option><option>Pastor Alemão</option><option>Golden Retriever</option><option>Poodle</option><option>Vira-lata</option></select></label>
        <label>Nome do Tutor *<input value={data.tutorName} onChange={(event) => update('tutorName', event.target.value)} placeholder="Ex: Maria Silva" /></label>
        <label>Veterinário que Atendeu *<input value={data.veterinarian} onChange={(event) => update('veterinarian', event.target.value)} placeholder="Ex: Dr. Carlos Souza" /></label>
      </div>
      <div className="consultation-next"><button className="primary-button" disabled={!complete} onClick={onNext}>Próximo: Histórico Clínico →</button></div>
    </section>
  )
}
