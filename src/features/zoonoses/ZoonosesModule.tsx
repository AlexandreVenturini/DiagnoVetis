import { useMemo, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Icon } from '../../components/common/Icon'
import { INITIAL_ZOONOSES } from './zoonosisData'
import type { PrevalenceLevel, RiskLevel, Zoonosis, ZoonosisFormData, ZoonosisScreen } from './zoonosisTypes'

const EMPTY_FORM: ZoonosisFormData = { name: '', agent: '', risk: 'Médio', prevalence: 'Média', hosts: [], transmission: '', symptoms: [], diagnostics: [], prevention: [] }

function splitList(value: string) { return value.split(',').map((item) => item.trim()).filter(Boolean) }

export function ZoonosesModule() {
  const [items, setItems] = useState(INITIAL_ZOONOSES)
  const [screen, setScreen] = useState<ZoonosisScreen>('browse')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'Todos'>('Todos')
  const [form, setForm] = useState(EMPTY_FORM)
  const [hostsText, setHostsText] = useState('')
  const [symptomsText, setSymptomsText] = useState('')
  const [diagnosticsText, setDiagnosticsText] = useState('')
  const [preventionText, setPreventionText] = useState('')

  const filtered = useMemo(() => items.filter((item) => {
    const search = query.trim().toLocaleLowerCase('pt-BR')
    return (!search || `${item.name} ${item.agent} ${item.hosts.join(' ')}`.toLocaleLowerCase('pt-BR').includes(search)) && (riskFilter === 'Todos' || item.risk === riskFilter)
  }), [items, query, riskFilter])
  const selected = items.find((item) => item.id === selectedId) ?? null

  function update<K extends keyof ZoonosisFormData>(key: K, value: ZoonosisFormData[K]) { setForm((current) => ({ ...current, [key]: value })) }
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextId = Math.max(0, ...items.map((item) => item.id)) + 1
    const newItem: Zoonosis = { ...form, id: nextId, hosts: splitList(hostsText), symptoms: splitList(symptomsText), diagnostics: splitList(diagnosticsText), prevention: splitList(preventionText) }
    setItems((current) => [...current, newItem]); setSelectedId(nextId); setScreen('browse'); setForm(EMPTY_FORM); setHostsText(''); setSymptomsText(''); setDiagnosticsText(''); setPreventionText('')
  }

  return <section className="zoonoses-module">
    <div className="zoonoses-header content-card"><div><h2>Banco de Dados de Zoonoses Caninas</h2><p>Referência clínica para pesquisa diagnóstica, prevenção e controle de zoonoses na Região Sudeste.</p></div><div><button className={screen === 'browse' ? 'primary-button' : 'outline-button'} onClick={() => setScreen('browse')}>▤ Consultar</button><button className={screen === 'create' ? 'primary-button' : 'outline-button'} onClick={() => setScreen('create')}>＋ Cadastrar zoonose</button></div></div>

    {screen === 'create' ? <form className="zoonosis-form content-card" onSubmit={save}><div className="zoonosis-form-heading"><h3>Cadastrar nova zoonose</h3><p>Inclua as informações clínicas e epidemiológicas conhecidas.</p></div><div className="zoonosis-form-grid">
      <label>Nome da zoonose<input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Ex.: Leishmaniose Visceral" required /></label><label>Agente etiológico<input value={form.agent} onChange={(event) => update('agent', event.target.value)} placeholder="Ex.: Leishmania infantum" required /></label>
      <label>Nível de risco<select value={form.risk} onChange={(event) => update('risk', event.target.value as RiskLevel)}><option>Alto</option><option>Médio</option><option>Baixo</option></select></label><label>Prevalência na região<select value={form.prevalence} onChange={(event) => update('prevalence', event.target.value as PrevalenceLevel)}><option>Alta</option><option>Média</option><option>Baixa</option></select></label>
      <label className="full-field">Hospedeiros<input value={hostsText} onChange={(event) => setHostsText(event.target.value)} placeholder="Separe por vírgulas: Cães, Gatos, Raposas" required /></label><label className="full-field">Forma de transmissão<textarea value={form.transmission} onChange={(event) => update('transmission', event.target.value)} placeholder="Descreva como ocorre a transmissão" required /></label>
      <label className="full-field">Sintomas clínicos<textarea value={symptomsText} onChange={(event) => setSymptomsText(event.target.value)} placeholder="Separe os sintomas por vírgulas" /></label><label className="full-field">Métodos diagnósticos<textarea value={diagnosticsText} onChange={(event) => setDiagnosticsText(event.target.value)} placeholder="Separe os métodos por vírgulas" /></label><label className="full-field">Medidas de prevenção e controle<textarea value={preventionText} onChange={(event) => setPreventionText(event.target.value)} placeholder="Separe as medidas por vírgulas" /></label>
    </div><div className="form-actions"><button className="primary-button" type="submit">Cadastrar zoonose</button><button className="secondary-button" type="button" onClick={() => setScreen('browse')}>Cancelar</button></div></form> : <>
      <div className="zoonoses-search content-card"><div className="zoonosis-search-input"><Icon><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></Icon><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome, agente ou hospedeiro..." /></div><select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value as RiskLevel | 'Todos')}><option>Todos</option><option>Alto</option><option>Médio</option><option>Baixo</option></select><span>{filtered.length} zoonose(s) encontrada(s)</span></div>
      <div className="zoonoses-browser"><div className="zoonosis-list">{filtered.map((item) => <button className={`zoonosis-card${selectedId === item.id ? ' selected' : ''}`} key={item.id} onClick={() => setSelectedId(item.id)}><div><h3>{item.name}</h3><p><strong>Agente:</strong> {item.agent}</p><p><strong>Hospedeiros:</strong> {item.hosts.join(', ')}</p></div><div><span className={`risk-tag risk-${item.risk.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}>{item.risk} risco</span><span className="prevalence-tag">Prev. {item.prevalence}</span></div></button>)}{filtered.length === 0 && <div className="empty-appointments">Nenhuma zoonose encontrada.</div>}</div><ZoonosisDetails item={selected} /></div>
    </>}
  </section>
}

function ZoonosisDetails({ item }: { item: Zoonosis | null }) {
  if (!item) return <aside className="zoonosis-details empty"><span>▤</span><p>Selecione uma zoonose para consultar as informações completas.</p></aside>
  return <aside className="zoonosis-details"><div className="zoonosis-detail-heading"><div><h3>{item.name}</h3><p>Informações clínicas e epidemiológicas</p></div><div><span className={`risk-tag risk-${item.risk.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}>{item.risk} risco</span><span className="prevalence-tag">Prevalência {item.prevalence}</span></div></div><DetailSection icon="⚕" title="Agente etiológico"><p>{item.agent}</p></DetailSection><DetailSection icon="▤" title="Hospedeiros"><ul>{item.hosts.map((host) => <li key={host}>{host}</li>)}</ul></DetailSection><DetailSection icon="⇄" title="Transmissão"><p>{item.transmission}</p></DetailSection><DetailSection icon="!" title="Sintomas clínicos" warning><ul>{item.symptoms.map((symptom) => <li key={symptom}>{symptom}</li>)}</ul></DetailSection><DetailSection icon="⌕" title="Métodos diagnósticos"><ul>{item.diagnostics.map((method) => <li key={method}>{method}</li>)}</ul></DetailSection><DetailSection icon="♢" title="Prevenção e controle"><ul>{item.prevention.map((measure) => <li key={measure}>{measure}</li>)}</ul></DetailSection></aside>
}

function DetailSection({ icon, title, warning, children }: { icon: string; title: string; warning?: boolean; children: ReactNode }) { return <section className={`zoonosis-detail-section${warning ? ' warning' : ''}`}><h4><span>{icon}</span>{title}</h4><div>{children}</div></section> }
