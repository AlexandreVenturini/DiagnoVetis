import { describe, it, expect, beforeEach } from 'vitest'
import './setup'
import { Medicamento } from '../models/Medicamento'
import { MedicamentoService } from '../services/MedicamentoService'
import { ValidacaoError } from '../services/validation/ValidacaoError'

function novoMedicamento(id = 1): Medicamento {
    return new Medicamento(id, 'Amoxicilina Vet', 'Amoxicilina', 'Antibiótico de amplo espectro', 50, 'mg/ml', 'Suspensão oral', 'Oral', 'Uso veterinário')
}

let service: MedicamentoService

beforeEach(() => {
    service = new MedicamentoService()
})

describe('MedicamentoService.adicionarMedicamento', () => {
    it('adiciona medicamento válido com sucesso', () => {
        service.adicionarMedicamento(novoMedicamento())
        expect(service.listarMedicamentos()).toHaveLength(1)
    })

    it('lança erro para id duplicado', () => {
        service.adicionarMedicamento(novoMedicamento(1))
        expect(() => service.adicionarMedicamento(novoMedicamento(1))).toThrow(ValidacaoError)
    })

    it('lança erro para nome comercial vazio', () => {
        const m = new Medicamento(1, '', 'Amoxicilina', 'Desc', 50, 'mg/ml', 'Suspensão', 'Oral', 'Vet')
        expect(() => service.adicionarMedicamento(m)).toThrow(ValidacaoError)
    })

    it('lança erro para princípio ativo vazio', () => {
        const m = new Medicamento(1, 'Amoxicilina Vet', '', 'Desc', 50, 'mg/ml', 'Suspensão', 'Oral', 'Vet')
        expect(() => service.adicionarMedicamento(m)).toThrow(ValidacaoError)
    })

    it('lança erro para forma farmacêutica vazia', () => {
        const m = new Medicamento(1, 'Amoxicilina Vet', 'Amoxicilina', 'Desc', 50, 'mg/ml', '', 'Oral', 'Vet')
        expect(() => service.adicionarMedicamento(m)).toThrow(ValidacaoError)
    })

    it('lança erro para via de administração vazia', () => {
        const m = new Medicamento(1, 'Amoxicilina Vet', 'Amoxicilina', 'Desc', 50, 'mg/ml', 'Suspensão', '', 'Vet')
        expect(() => service.adicionarMedicamento(m)).toThrow(ValidacaoError)
    })

    it('lança erro para concentração zero', () => {
        const m = new Medicamento(1, 'Amoxicilina Vet', 'Amoxicilina', 'Desc', 0, 'mg/ml', 'Suspensão', 'Oral', 'Vet')
        expect(() => service.adicionarMedicamento(m)).toThrow(ValidacaoError)
    })

    it('lança erro para concentração negativa', () => {
        const m = new Medicamento(1, 'Amoxicilina Vet', 'Amoxicilina', 'Desc', -10, 'mg/ml', 'Suspensão', 'Oral', 'Vet')
        expect(() => service.adicionarMedicamento(m)).toThrow(ValidacaoError)
    })
})

describe('MedicamentoService.buscarPorNome', () => {
    it('encontra medicamento pelo nome parcial', () => {
        service.adicionarMedicamento(novoMedicamento())
        expect(service.buscarPorNome('amox')).toHaveLength(1)
    })

    it('retorna lista vazia para nome inexistente', () => {
        service.adicionarMedicamento(novoMedicamento())
        expect(service.buscarPorNome('dipirona')).toHaveLength(0)
    })
})

describe('MedicamentoService.buscarPorPrincipioAtivo', () => {
    it('encontra medicamento pelo princípio ativo', () => {
        service.adicionarMedicamento(novoMedicamento())
        expect(service.buscarPorPrincipioAtivo('amoxicilina')).toHaveLength(1)
    })

    it('retorna lista vazia para princípio ativo inexistente', () => {
        service.adicionarMedicamento(novoMedicamento())
        expect(service.buscarPorPrincipioAtivo('ibuprofeno')).toHaveLength(0)
    })
})

describe('MedicamentoService.atualizarMedicamento', () => {
    it('atualiza medicamento existente', () => {
        service.adicionarMedicamento(novoMedicamento())
        const atualizado = new Medicamento(1, 'Dipirona Vet', 'Dipirona', 'Analgésico', 500, 'mg', 'Comprimido', 'Oral', 'Vet')
        service.atualizarMedicamento(atualizado)
        expect(service.buscarPorId(1)?.nome).toBe('Dipirona Vet')
    })
})

describe('MedicamentoService.removerMedicamento', () => {
    it('remove medicamento existente', () => {
        service.adicionarMedicamento(novoMedicamento())
        service.removerMedicamento(1)
        expect(service.listarMedicamentos()).toHaveLength(0)
    })
})
