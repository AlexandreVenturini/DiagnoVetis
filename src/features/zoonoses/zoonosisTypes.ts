export type RiskLevel = 'Alto' | 'Médio' | 'Baixo'
export type PrevalenceLevel = 'Alta' | 'Média' | 'Baixa'

export type Zoonosis = {
  id: number
  name: string
  agent: string
  risk: RiskLevel
  prevalence: PrevalenceLevel
  hosts: string[]
  transmission: string
  symptoms: string[]
  diagnostics: string[]
  prevention: string[]
}

export type ZoonosisFormData = Omit<Zoonosis, 'id'>
export type ZoonosisScreen = 'browse' | 'create'
