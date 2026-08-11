import type { PatientRecord } from './recordTypes'

export const INITIAL_PATIENT_RECORDS: PatientRecord[] = [
  {
    id: 1, dogName: 'Bob', tutorName: 'João Silva', breed: 'Labrador', age: '3 anos', sex: 'Macho',
    allergies: ['Dipirona'], previousDiseases: ['Dermatite alérgica'], vaccines: ['Antirrábica - 09/02/2026', 'V10 - 15/01/2026'],
    weights: [{ date: '2025-10-18', weight: 26.2 }, { date: '2026-01-19', weight: 27.1 }, { date: '2026-03-14', weight: 28 }],
    records: [
      { id: 101, kind: 'Consulta', date: '2026-03-14', veterinarian: 'Dr. Carlos Mendes', crmv: 'CRMV-ES 1234', students: ['Marina Alves', 'Pedro Lima'], description: 'Consulta de rotina. Animal apresenta boa saúde geral.', diagnosis: 'Paciente hígido', conduct: 'Manter alimentação e exercícios regulares.', exams: [], attachments: [], prescriptions: [], validation: 'validated', validatedBy: 'Dr. Carlos Mendes' },
      { id: 102, kind: 'Vacina', date: '2026-02-09', veterinarian: 'Dra. Ana Paula', crmv: 'CRMV-ES 2381', students: ['Luana Reis'], description: 'Vacina antirrábica aplicada.', diagnosis: 'Imunização preventiva', conduct: 'Retorno anual.', exams: [], attachments: ['comprovante-vacina.pdf'], prescriptions: [], validation: 'validated', validatedBy: 'Dra. Ana Paula' },
      { id: 103, kind: 'Exame', date: '2026-01-19', veterinarian: 'Dr. Carlos Mendes', crmv: 'CRMV-ES 1234', students: [], description: 'Hemograma completo. Resultados dentro da normalidade.', diagnosis: 'Sem alterações hematológicas', conduct: 'Acompanhamento anual.', exams: ['Hemograma completo'], attachments: ['hemograma-bob.pdf'], prescriptions: [], validation: 'validated', validatedBy: 'Dr. Carlos Mendes' },
    ],
  },
  {
    id: 2, dogName: 'Mia', tutorName: 'Maria Santos', breed: 'Beagle', age: '5 anos', sex: 'Fêmea',
    allergies: [], previousDiseases: ['Otite recorrente'], vaccines: ['V10 - 20/03/2026'],
    weights: [{ date: '2025-11-02', weight: 12.4 }, { date: '2026-03-09', weight: 12.8 }],
    records: [
      { id: 201, kind: 'Tratamento', date: '2026-03-09', veterinarian: 'Dra. Ana Paula', crmv: 'CRMV-ES 2381', students: ['Rafael Nunes'], description: 'Tratamento de otite externa.', diagnosis: 'Otite bacteriana', conduct: 'Higienização auricular por 10 dias.', exams: ['Citologia auricular'], attachments: [], prescriptions: ['Solução otológica - 3 gotas, 2x ao dia, por 10 dias'], validation: 'pending', validatedBy: '' },
      { id: 202, kind: 'Consulta', date: '2026-01-12', veterinarian: 'Dr. Carlos Mendes', crmv: 'CRMV-ES 1234', students: [], description: 'Consulta preventiva sem intercorrências.', diagnosis: 'Paciente estável', conduct: 'Manter acompanhamento.', exams: [], attachments: [], prescriptions: [], validation: 'validated', validatedBy: 'Dr. Carlos Mendes' },
    ],
  },
]
