import type { PatientRecord } from './recordTypes'

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;')
}

function list(items: string[], fallback = 'Nenhum registro') {
  return items.length ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : `<p>${fallback}</p>`
}

export function exportPatientRecord(patient: PatientRecord) {
  const reportWindow = window.open('', '_blank', 'width=960,height=850')
  if (!reportWindow) return false
  const issuedAt = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeStyle: 'short' }).format(new Date())
  const timeline = [...patient.records].sort((a, b) => b.date.localeCompare(a.date)).map((record) => `
    <article><div class="record-head"><strong>${escapeHtml(record.kind)} - ${new Date(`${record.date}T12:00:00`).toLocaleDateString('pt-BR')}</strong><span>${record.validation === 'validated' ? 'Validado' : 'Pendente de validação'}</span></div>
    <p>${escapeHtml(record.description)}</p><div class="grid"><div><b>Diagnóstico</b>${escapeHtml(record.diagnosis || 'Não informado')}</div><div><b>Conduta</b>${escapeHtml(record.conduct || 'Não informada')}</div><div><b>Profissional</b>${escapeHtml(`${record.veterinarian} - ${record.crmv}`)}</div><div><b>Alunos participantes</b>${escapeHtml(record.students.join(', ') || 'Nenhum')}</div></div>
    ${record.exams.length ? `<h4>Exames</h4>${list(record.exams)}` : ''}${record.prescriptions.length ? `<h4>Prescrições</h4>${list(record.prescriptions)}` : ''}
    ${record.validation === 'validated' ? `<div class="signature">Validado eletronicamente por <strong>${escapeHtml(record.validatedBy)}</strong></div>` : ''}</article>`).join('')

  reportWindow.document.write(`<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Prontuário - ${escapeHtml(patient.dogName)}</title><style>
    *{box-sizing:border-box}@page{size:A4;margin:15mm}body{margin:0;background:#eef1ef;color:#252925;font:11px/1.45 Arial,sans-serif}.page{width:210mm;min-height:297mm;margin:18px auto;padding:15mm;background:#fff;box-shadow:0 5px 20px #0002}.header{display:flex;justify-content:space-between;align-items:center;padding-bottom:14px;border-bottom:3px solid #287642}.brand h1{margin:0;color:#176534;font-size:23px}.brand p,.meta p{margin:3px 0}.meta{text-align:right}.patient{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:16px 0}.field,.clinical{padding:8px;border:1px solid #dce2dd;border-radius:5px}.field span,.grid b{display:block;color:#667068;font-size:8px;text-transform:uppercase}.clinical-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:18px}.clinical h3{margin:0 0 6px;color:#176534;font-size:11px}.clinical ul,.clinical p{margin:0;padding-left:16px}.timeline>h2{color:#176534;font-size:15px}.timeline article{margin:10px 0;padding:12px;border-left:3px solid #287642;background:#fafcfb;page-break-inside:avoid}.record-head{display:flex;justify-content:space-between}.record-head span{color:#176534;font-size:9px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:7px 20px}.grid div{white-space:pre-wrap}h4{margin:8px 0 2px}.signature{margin-top:12px;padding-top:7px;border-top:1px solid #cfd8d1;font-size:9px}footer{margin-top:24px;padding-top:8px;border-top:1px solid #ddd;text-align:center;color:#777;font-size:8px}.actions{position:fixed;right:22px;bottom:22px;display:flex;gap:8px}.actions button{padding:10px 15px;border:0;border-radius:7px;color:white;font-weight:bold}.print{background:#287642}.close{background:#555}@media print{body{background:white}.page{width:auto;min-height:auto;margin:0;padding:0;box-shadow:none}.actions{display:none}}@media(max-width:800px){.page{width:100%;margin:0;padding:22px}.patient,.clinical-grid,.grid{grid-template-columns:1fr 1fr}}
  </style></head><body><main class="page"><header class="header"><div class="brand"><h1>DiagnoVetis</h1><p>IFES Campus Santa Teresa</p></div><div class="meta"><strong>Prontuário Clínico Veterinário</strong><p>Emitido em ${escapeHtml(issuedAt)}</p></div></header>
  <section class="patient"><div class="field"><span>Paciente</span><strong>${escapeHtml(patient.dogName)}</strong></div><div class="field"><span>Tutor</span><strong>${escapeHtml(patient.tutorName)}</strong></div><div class="field"><span>Raça / sexo</span><strong>${escapeHtml(`${patient.breed} / ${patient.sex}`)}</strong></div><div class="field"><span>Idade</span><strong>${escapeHtml(patient.age)}</strong></div></section>
  <section class="clinical-grid"><div class="clinical"><h3>Alergias</h3>${list(patient.allergies)}</div><div class="clinical"><h3>Doenças anteriores</h3>${list(patient.previousDiseases)}</div><div class="clinical"><h3>Vacinas</h3>${list(patient.vaccines)}</div></section><section class="timeline"><h2>Histórico clínico cronológico</h2>${timeline}</section><footer>DiagnoVetis - IFES Campus Santa Teresa - Documento gerado eletronicamente</footer></main><div class="actions"><button class="close" onclick="window.close()">Fechar</button><button class="print" onclick="window.print()">Imprimir / Salvar PDF</button></div></body></html>`)
  reportWindow.document.close()
  return true
}
