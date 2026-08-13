import { useState } from 'react'
import { Consulta } from '../models/Consulta'
import { DiagnosticoZoonose } from '../models/DiagnosticoZoonose'
import { ConsultaService } from '../services/ConsultaService'
import { MedicoService } from '../services/MedicoService'
import { PetService } from '../services/PetService'
import { TutorService } from '../services/TutorService'
import type { ConsultationData } from '../features/consultations/consultationTypes'

const consultaService = new ConsultaService()
const medicoService = new MedicoService()
const petService = new PetService()
const tutorService = new TutorService()

function proximoId(): number {
    const consultas = consultaService.listarConsultas()
    return consultas.length > 0 ? Math.max(...consultas.map(c => c.id)) + 1 : 1
}

function dataConsultaParaHoje(): Date {
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    return hoje
}

function resolverMedico(nomeVeterinario: string) {
    const medicos = medicoService.listarMedicos()
    return medicos.find(m => m.nome.toLowerCase().includes(nomeVeterinario.toLowerCase()))
        ?? medicos[0]
        ?? null
}

function resolverPet(nomeCao: string, nomeTutor: string) {
    const pets = petService.listarPets()

    const porNome = pets.find(p =>
        p.nome.toLowerCase().includes(nomeCao.toLowerCase())
    )
    if (porNome) return porNome

    const tutores = tutorService.buscarPorNome(nomeTutor)
    if (tutores.length > 0) {
        const petDoTutor = pets.find(p => p.tutor.id === tutores[0].id)
        if (petDoTutor) return petDoTutor
    }

    return pets[0] ?? null
}

export function useConsultas() {
    const [consultas, setConsultas] = useState(() => consultaService.listarConsultas())

    function salvarConsulta(data: ConsultationData): { sucesso: boolean; erro?: string } {
        const medico = resolverMedico(data.veterinarian)
        if (!medico) {
            return { sucesso: false, erro: 'Nenhum médico cadastrado. Cadastre um médico antes de salvar a consulta.' }
        }

        const pet = resolverPet(data.dogName, data.tutorName)
        if (!pet) {
            return { sucesso: false, erro: 'Nenhum paciente encontrado. Cadastre o pet antes de salvar a consulta.' }
        }

        try {
            const consulta = new Consulta(
                proximoId(),
                dataConsultaParaHoje(),
                new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                data.conduct,
                `Queixa: ${data.mainComplaint}. Histórico: ${data.history}`,
                medico,
                pet,
                new DiagnosticoZoonose(
                    data.zoonosisSearch ? 'suspeito' : 'negativo',
                    data.zoonosisSearch || 'Sem suspeita de zoonose',
                    new Date()
                )
            )

            consultaService.adicionarConsulta(consulta)
            setConsultas(consultaService.listarConsultas())
            return { sucesso: true }
        } catch (e) {
            return { sucesso: false, erro: (e as Error).message }
        }
    }

    function listarPorPet(petId: number) {
        return consultaService.listarPorPet(petId)
    }

    function listarPorMedico(medicoId: number) {
        return consultaService.listarPorMedico(medicoId)
    }

    return { consultas, salvarConsulta, listarPorPet, listarPorMedico }
}
