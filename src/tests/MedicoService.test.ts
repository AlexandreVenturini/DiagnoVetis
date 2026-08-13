import { describe, it, expect, beforeEach } from 'vitest'
import './setup'
import { Medico } from '../models/Medico'
import { MedicoService } from '../services/MedicoService'
import { ValidacaoError } from '../services/validation/ValidacaoError'

function novoMedico(id = 1): Medico {
    return new Medico(id, 'Dr. Silva', '27933001234', 'silva@vet.com', 'Clínica Geral', '12345-ES')
}

let service: MedicoService

beforeEach(() => {
    service = new MedicoService()
})

describe('MedicoService.adicionarMedico', () => {
    it('adiciona médico válido com sucesso', () => {
        service.adicionarMedico(novoMedico())
        expect(service.listarMedicos()).toHaveLength(1)
    })

    it('lança erro para id duplicado', () => {
        service.adicionarMedico(novoMedico(1))
        expect(() => service.adicionarMedico(novoMedico(1))).toThrow(ValidacaoError)
    })

    it('lança erro para nome vazio', () => {
        const medico = new Medico(1, '', '27933001234', 'silva@vet.com', 'Clínica Geral', '12345-ES')
        expect(() => service.adicionarMedico(medico)).toThrow(ValidacaoError)
    })

    it('lança erro para e-mail inválido', () => {
        const medico = new Medico(1, 'Dr. Silva', '27933001234', 'email-invalido', 'Clínica Geral', '12345-ES')
        expect(() => service.adicionarMedico(medico)).toThrow(ValidacaoError)
    })

    it('lança erro para telefone inválido', () => {
        const medico = new Medico(1, 'Dr. Silva', '123', 'silva@vet.com', 'Clínica Geral', '12345-ES')
        expect(() => service.adicionarMedico(medico)).toThrow(ValidacaoError)
    })

    it('lança erro para especialidade vazia', () => {
        const medico = new Medico(1, 'Dr. Silva', '27933001234', 'silva@vet.com', '', '12345-ES')
        expect(() => service.adicionarMedico(medico)).toThrow(ValidacaoError)
    })

    it('lança erro para CRMV inválido', () => {
        const medico = new Medico(1, 'Dr. Silva', '27933001234', 'silva@vet.com', 'Clínica Geral', 'CRMV-INVALIDO')
        expect(() => service.adicionarMedico(medico)).toThrow(ValidacaoError)
    })
})

describe('MedicoService.buscarPorId', () => {
    it('retorna médico existente', () => {
        service.adicionarMedico(novoMedico(1))
        expect(service.buscarPorId(1)?.nome).toBe('Dr. Silva')
    })

    it('retorna undefined para id inexistente', () => {
        expect(service.buscarPorId(99)).toBeUndefined()
    })
})

describe('MedicoService.listarPorEspecialidade', () => {
    it('filtra médicos pela especialidade', () => {
        service.adicionarMedico(novoMedico(1))
        service.adicionarMedico(new Medico(2, 'Dra. Lima', '27933005678', 'lima@vet.com', 'Cirurgia', '67890-ES'))
        expect(service.listarPorEspecialidade('clínica')).toHaveLength(1)
    })
})

describe('MedicoService.buscarPorCrmv', () => {
    it('encontra médico pelo CRMV exato', () => {
        service.adicionarMedico(novoMedico())
        expect(service.buscarPorCrmv('12345-ES')?.nome).toBe('Dr. Silva')
    })

    it('retorna undefined para CRMV inexistente', () => {
        expect(service.buscarPorCrmv('99999-ES')).toBeUndefined()
    })
})

describe('MedicoService.removerMedico', () => {
    it('remove médico existente', () => {
        service.adicionarMedico(novoMedico())
        service.removerMedico(1)
        expect(service.listarMedicos()).toHaveLength(0)
    })
})
