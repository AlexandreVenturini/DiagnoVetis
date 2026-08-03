import type { ConsultationData } from '../consultationTypes'

type PhysicalExamStepProps = {
  data: ConsultationData
  update: (key: keyof ConsultationData, value: string) => void
  onBack: () => void
  onNext: () => void
}

const mucosaOptions = ['Normal (Róseas)', 'Pálidas', 'Ictéricas', 'Cianóticas']

export function PhysicalExamStep({ data, update, onBack, onNext }: PhysicalExamStepProps) {
  return (
    <section className="consultation-panel content-card">
      <h2>3. Exame Físico (Checklist)</h2>
      <fieldset className="mucosa-options">
        <legend>Mucosas</legend>
        <div>{mucosaOptions.map((option) => <button className={data.mucosa === option ? 'selected' : ''} type="button" onClick={() => update('mucosa', option)} key={option}>{option}</button>)}</div>
      </fieldset>
      <div className="consultation-form-grid exam-grid">
        <label>TPC (Tempo de Preenchimento Capilar) - segundos<input value={data.capillaryRefill} onChange={(event) => update('capillaryRefill', event.target.value)} placeholder="Normal: < 2s" /></label>
        <label>Frequência Cardíaca (bpm)<input type="number" value={data.heartRate} onChange={(event) => update('heartRate', event.target.value)} placeholder="Normal: 60-140 bpm" /></label>
        <label>Frequência Respiratória (mpm)<input type="number" value={data.respiratoryRate} onChange={(event) => update('respiratoryRate', event.target.value)} placeholder="Normal: 10-30 mpm" /></label>
        <label>Temperatura (°C)<input type="number" step="0.1" value={data.temperature} onChange={(event) => update('temperature', event.target.value)} placeholder="Normal: 37.5-39.2°C" /></label>
        <label>Hidratação<select value={data.hydration} onChange={(event) => update('hydration', event.target.value)}><option>Normal</option><option>Desidratação leve</option><option>Desidratação moderada</option><option>Desidratação grave</option></select></label>
        <label>Nível de Consciência<select value={data.consciousness} onChange={(event) => update('consciousness', event.target.value)}><option>Alerta</option><option>Deprimido</option><option>Estupor</option><option>Coma</option></select></label>
      </div>
      <div className="step-navigation"><button className="secondary-button" onClick={onBack}>← Voltar</button><button className="primary-button" onClick={onNext}>Próximo: Diagnóstico →</button></div>
    </section>
  )
}
