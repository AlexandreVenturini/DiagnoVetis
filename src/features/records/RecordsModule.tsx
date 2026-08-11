import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Icon } from '../../components/common/Icon'
import { INITIAL_PATIENT_RECORDS } from './recordData'
import { exportPatientRecord } from './recordReport'
import type { ClinicalRecord, PatientRecord, RecordKind, RecordScreen } from './recordTypes'

const KIND_ICONS: Record<RecordKind, string> = { Consulta: '▤', Vacina: '+', Exame: '⚗', Tratamento: '∿', Retorno: '↻' }
const VALIDATION_LABELS = { draft: 'Rascunho', pending: 'Aguardando validação', validated: 'Validado' }

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR')
}

function splitItems(value: string) {
  return value.split('\n').map((item) => item.trim()).filter(Boolean)
}

function WeightChart({ patient }: { patient: PatientRecord }) {
  const values = patient.weights.map((item) => item.weight)
  const min = Math.min(...values) - 1
  const max = Math.max(...values) + 1
  const points = patient.weights.map((entry, index) => {
    const x = patient.weights.length === 1 ? 50 : 5 + (index / (patient.weights.length - 1)) * 90
    const y = 85 - ((entry.weight - min) / (max - min)) * 65
    return `${x},${y}`
  }).join(' ')
  return <div className="weight-chart"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="Gráfico da evolução de peso"><polyline points={points} />{patient.weights.map((entry, index) => { const [x, y] = points.split(' ')[index].split(','); return <circle key={entry.date} cx={x} cy={y} r="2" /> })}</svg><div className="weight-chart-labels">{patient.weights.map((entry) => <span key={entry.date}><strong>{entry.weight} kg</strong>{formatDate(entry.date)}</span>)}</div></div>
}

export function RecordsModule() {
  const [patients, setPatients] = useState(INITIAL_PATIENT_RECORDS)
  const [screen, setScreen] = useState<RecordScreen>('list')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const [expandedRecord, setExpandedRecord] = useState<number | null>(null)
  const [notice, setNotice] = useState('')
  const [kind, setKind] = useState<RecordKind>('Consulta')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [veterinarian, setVeterinarian] = useState('')
  const [crmv, setCrmv] = useState('')
  const [students, setStudents] = useState('')
  const [description, setDescription] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [conduct, setConduct] = useState('')
  const [exams, setExams] = useState('')
  const [prescriptions, setPrescriptions] = useState('')
  const [attachments, setAttachments] = useState<string[]>([])
  const [weight, setWeight] = useState('')

  const selected = patients.find((patient) => patient.id === selectedId) ?? null
  const filtered = useMemo(() => patients.filter((patient) => `${patient.dogName} ${patient.tutorName}`.toLocaleLowerCase('pt-BR').includes(query.trim().toLocaleLowerCase('pt-BR'))), [patients, query])

  function openPatient(patient: PatientRecord) { setSelectedId(patient.id); setScreen('details'); setNotice('') }
  function updatePatient(id: number, updater: (patient: PatientRecord) => PatientRecord) { setPatients((current) => current.map((patient) => patient.id === id ? updater(patient) : patient)) }

  function attachFiles(event: ChangeEvent<HTMLInputElement>) {
    setAttachments(Array.from(event.target.files ?? []).map((file) => file.name))
  }

  function saveRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selected) return
    const nextId = Math.max(0, ...patients.flatMap((patient) => patient.records.map((record) => record.id))) + 1
    const newRecord: ClinicalRecord = { id: nextId, kind, date, veterinarian, crmv, students: splitItems(students.replaceAll(',', '\n')), description, diagnosis, conduct, exams: splitItems(exams), attachments, prescriptions: splitItems(prescriptions), validation: 'pending', validatedBy: '' }
    updatePatient(selected.id, (patient) => ({ ...patient, records: [newRecord, ...patient.records], weights: weight ? [...patient.weights, { date, weight: Number(weight) }] : patient.weights }))
    setScreen('details'); setNotice('Registro salvo e enviado para validação do responsável.'); setDescription(''); setDiagnosis(''); setConduct(''); setExams(''); setPrescriptions(''); setStudents(''); setAttachments([]); setWeight('')
  }

  function validateRecord(recordId: number) {
    if (!selected) return
    updatePatient(selected.id, (patient) => ({ ...patient, records: patient.records.map((record) => record.id === recordId ? { ...record, validation: 'validated', validatedBy: record.veterinarian } : record) }))
    setNotice('Registro validado eletronicamente pelo profissional responsável.')
  }

  if (screen === 'list') return <section className="records-module">
    <div className="records-heading"><div><h2>Prontuários Clínicos</h2><p>Consulte o histórico completo dos pacientes.</p></div><div className="records-stat"><strong>{patients.length}</strong><span>pacientes acompanhados</span></div></div>
    <div className="record-search content-card"><Icon><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></Icon><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome do animal ou tutor..." /></div>
    <div className="patient-record-grid">{filtered.map((patient) => {
      const latest = [...patient.records].sort((a, b) => b.date.localeCompare(a.date))[0]
      const pending = patient.records.filter((record) => record.validation === 'pending').length
      return <button className="patient-record-card" key={patient.id} onClick={() => openPatient(patient)}><div className="patient-card-top"><div><h3>{patient.dogName}</h3><p>Tutor: {patient.tutorName}</p></div><span>{patient.records.length} registros</span></div><div className="patient-clinical-flags"><span>{patient.breed}</span><span>{patient.weights.at(-1)?.weight ?? '-'} kg</span>{patient.allergies.length > 0 && <span className="alert-flag">{patient.allergies.length} alergia(s)</span>}</div><div className="latest-record"><span className={`record-kind-icon kind-${latest.kind.toLowerCase()}`}>{KIND_ICONS[latest.kind]}</span><div><small>Último atendimento</small><strong>{latest.kind}</strong><span>{formatDate(latest.date)} · {latest.veterinarian}</span></div></div>{pending > 0 && <span className="pending-records">{pending} aguardando validação</span>}</button>
    })}{filtered.length === 0 && <div className="empty-appointments">Nenhum prontuário encontrado.</div>}</div>
  </section>

  if (!selected) return null

  if (screen === 'create') return <section className="record-form-card content-card">
    <div className="records-heading"><div><h2>Adicionar registro ao prontuário</h2><p>Paciente: <strong>{selected.dogName}</strong> · Tutor: {selected.tutorName}</p></div><button className="secondary-button" onClick={() => setScreen('details')}>Voltar</button></div>
    <form className="record-form" onSubmit={saveRecord}>
      <label>Tipo de registro<select value={kind} onChange={(event) => setKind(event.target.value as RecordKind)}>{Object.keys(KIND_ICONS).map((item) => <option key={item}>{item}</option>)}</select></label><label>Data<input type="date" value={date} onChange={(event) => setDate(event.target.value)} required /></label>
      <label>Veterinário responsável<input value={veterinarian} onChange={(event) => setVeterinarian(event.target.value)} placeholder="Nome do profissional" required /></label><label>CRMV<input value={crmv} onChange={(event) => setCrmv(event.target.value)} placeholder="CRMV-ES 0000" required /></label>
      <label className="full-field">Alunos participantes<input value={students} onChange={(event) => setStudents(event.target.value)} placeholder="Separe os nomes por vírgulas" /></label>
      <label className="full-field">Descrição clínica<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Anamnese, sinais clínicos e detalhes do atendimento" required /></label>
      <label>Diagnóstico<textarea value={diagnosis} onChange={(event) => setDiagnosis(event.target.value)} placeholder="Diagnóstico ou hipótese diagnóstica" /></label><label>Conduta<textarea value={conduct} onChange={(event) => setConduct(event.target.value)} placeholder="Tratamento, orientações e acompanhamento" /></label>
      <label>Exames solicitados ou realizados<textarea value={exams} onChange={(event) => setExams(event.target.value)} placeholder="Um exame por linha" /></label><label>Prescrições e receitas<textarea value={prescriptions} onChange={(event) => setPrescriptions(event.target.value)} placeholder="Medicamento, dose, frequência e duração" /></label>
      <label>Peso atual (kg)<input type="number" min="0" step="0.1" value={weight} onChange={(event) => setWeight(event.target.value)} placeholder="Ex.: 28,5" /></label><label>Anexos<input className="record-file-input" type="file" multiple onChange={attachFiles} /><span className="file-help">{attachments.length ? attachments.join(', ') : 'PDFs, imagens ou resultados de exames'}</span></label>
      <div className="record-validation-notice full-field"><span>✓</span><p><strong>Fluxo de validação</strong>Este registro será salvo como “Aguardando validação” até a confirmação do profissional responsável.</p></div>
      <div className="form-actions full-field"><button className="primary-button" type="submit">Salvar registro</button><button className="secondary-button" type="button" onClick={() => setScreen('details')}>Cancelar</button></div>
    </form>
  </section>

  const latestWeight = selected.weights.at(-1)?.weight
  return <section className="record-details-module">
    <div className="records-heading record-detail-heading"><div><button className="text-back-button" onClick={() => setScreen('list')}>‹ Prontuários</button><h2>{selected.dogName}</h2><p>Tutor: {selected.tutorName} · {selected.breed} · {selected.age}</p></div><div className="record-header-actions"><button className="outline-button" onClick={() => { const opened = exportPatientRecord(selected); setNotice(opened ? 'Relatório aberto para impressão ou salvamento em PDF.' : 'O navegador bloqueou a janela do relatório.') }}>⇩ Exportar PDF</button><button className="primary-button" onClick={() => setScreen('create')}>+ Adicionar registro</button></div></div>
    {notice && <p className="record-notice" role="status">{notice}</p>}
    <div className="clinical-summary-grid"><article><span>Peso atual</span><strong>{latestWeight ?? '-'} kg</strong><small>{selected.weights.length} medições</small></article><article className={selected.allergies.length ? 'clinical-alert-card' : ''}><span>Alergias</span><strong>{selected.allergies.length ? selected.allergies.join(', ') : 'Nenhuma conhecida'}</strong><small>Informação clínica importante</small></article><article><span>Doenças anteriores</span><strong>{selected.previousDiseases.join(', ') || 'Nenhuma registrada'}</strong><small>Histórico do paciente</small></article><article><span>Vacinas</span><strong>{selected.vaccines.length} registradas</strong><small>{selected.vaccines[0] ?? 'Nenhuma registrada'}</small></article></div>
    <div className="record-overview-grid"><article className="content-card weight-panel"><div className="panel-title"><h3>Evolução do peso</h3><span>kg</span></div><WeightChart patient={selected} /></article><article className="content-card preventive-panel"><h3>Cuidados preventivos</h3><div><strong>Vacinas</strong>{selected.vaccines.map((item) => <span key={item}>✓ {item}</span>)}</div><div><strong>Alergias</strong>{selected.allergies.length ? selected.allergies.map((item) => <span className="allergy-item" key={item}>! {item}</span>) : <span>Nenhuma conhecida</span>}</div></article></div>
    <div className="timeline-heading"><div><h3>Histórico clínico</h3><p>Registros em ordem cronológica, do mais recente ao mais antigo.</p></div><span>{selected.records.length} registros</span></div>
    <div className="clinical-timeline">{[...selected.records].sort((a, b) => b.date.localeCompare(a.date)).map((record) => { const expanded = expandedRecord === record.id; return <article className="timeline-record" key={record.id}><div className="timeline-marker"><span className={`record-kind-icon kind-${record.kind.toLowerCase()}`}>{KIND_ICONS[record.kind]}</span></div><button className="timeline-record-summary" onClick={() => setExpandedRecord(expanded ? null : record.id)}><div><span className="record-date">{formatDate(record.date)}</span><h4>{record.kind}</h4><p>{record.description}</p><div className="record-professional"><strong>{record.veterinarian}</strong><span>{record.crmv}</span>{record.students.length > 0 && <span>Alunos: {record.students.join(', ')}</span>}</div></div><div className="record-summary-side"><span className={`validation-badge validation-${record.validation}`}>{VALIDATION_LABELS[record.validation]}</span><span className="appointment-chevron"><Icon><path d="m7 10 5 5 5-5" /></Icon></span></div></button>{expanded && <div className="timeline-record-details"><div><span>Diagnóstico</span><strong>{record.diagnosis || 'Não informado'}</strong></div><div><span>Conduta</span><strong>{record.conduct || 'Não informada'}</strong></div><div><span>Exames</span><strong>{record.exams.join(', ') || 'Nenhum'}</strong></div><div><span>Prescrições</span><strong>{record.prescriptions.join('; ') || 'Nenhuma'}</strong></div><div><span>Anexos</span><strong>{record.attachments.join(', ') || 'Nenhum anexo'}</strong></div><div><span>Validação</span><strong>{record.validation === 'validated' ? `Validado por ${record.validatedBy}` : 'Pendente do responsável'}</strong></div>{record.validation !== 'validated' && <button className="validate-button" onClick={() => validateRecord(record.id)}>✓ Validar como responsável</button>}</div>}</article>})}</div>
  </section>
}
