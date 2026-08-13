import { describe, it, expect, beforeEach } from 'vitest'
import './setup'
import { Funcionario } from '../models/Funcionario'
import { Medico } from '../models/Medico'
import { FuncionarioService } from '../services/FuncionarioService'
import { MedicoService } from '../services/MedicoService'
import { ValidacaoError } from '../services/validation/ValidacaoError'

function criarMedico(id = 1): Medico {
    return new Medico(id, 'Dr. Silva', '27933001234', 'silva@vet.com', 'Clínica Geral', '12345-ES')
}

function novoFuncionario(medico: Medico, id = 1): Funcionario {
    return new Funcionario(id, new Date('2024-01-01'), medico)
}

let service: FuncionarioService
let medicoService: MedicoService
let medico: Medico

beforeEach(() => {
    service = new FuncionarioService()
    medicoService = new MedicoService()
    medico = criarMedico()
    medicoService.adicionarMedico(medico)
})

describe('FuncionarioService.adicionarFuncionario', () => {
    it('adiciona funcionário válido com sucesso', () => {
        service.adicionarFuncionario(novoFuncionario(medico))
        expect(service.listarFuncionarios()).toHaveLength(1)
    })

    it('lança erro para id duplicado', () => {
        service.adicionarFuncionario(novoFuncionario(medico, 1))
        expect(() => service.adicionarFuncionario(novoFuncionario(medico, 1))).toThrow(ValidacaoError)
    })

    it('lança erro para data de admissão inválida', () => {
        const funcionario = new Funcionario(1, new Date('invalida'), medico)
        expect(() => service.adicionarFuncionario(funcionario)).toThrow(ValidacaoError)
    })

    it('adiciona múltiplos funcionários com ids diferentes', () => {
        const medico2 = criarMedico(2)
        medicoService.adicionarMedico(medico2)
        service.adicionarFuncionario(novoFuncionario(medico, 1))
        service.adicionarFuncionario(novoFuncionario(medico2, 2))
        expect(service.listarFuncionarios()).toHaveLength(2)
    })
})

describe('FuncionarioService.buscarPorId', () => {
    it('retorna funcionário existente', () => {
        service.adicionarFuncionario(novoFuncionario(medico))
        expect(service.buscarPorId(1)?.medico.nome).toBe('Dr. Silva')
    })

    it('retorna undefined para id inexistente', () => {
        expect(service.buscarPorId(99)).toBeUndefined()
    })
})

describe('FuncionarioService.atualizarFuncionario', () => {
    it('atualiza funcionário existente', () => {
        service.adicionarFuncionario(novoFuncionario(medico, 1))
        const medico2 = criarMedico(2)
        medicoService.adicionarMedico(medico2)
        const atualizado = new Funcionario(1, new Date('2025-01-01'), medico2)
        service.atualizarFuncionario(atualizado)
        expect(service.buscarPorId(1)?.medico.nome).toBe('Dr. Silva')
    })
})

describe('FuncionarioService.removerFuncionario', () => {
    it('remove funcionário existente', () => {
        service.adicionarFuncionario(novoFuncionario(medico))
        service.removerFuncionario(1)
        expect(service.listarFuncionarios()).toHaveLength(0)
    })
})

describe('Funcionario model', () => {
    it('retorna id correto', () => {
        expect(novoFuncionario(medico, 5).id).toBe(5)
    })

    it('retorna data de admissão correta', () => {
        const data = new Date('2024-06-15')
        expect(new Funcionario(1, data, medico).dataAdmissao).toEqual(data)
    })

    it('retorna médico vinculado', () => {
        expect(novoFuncionario(medico).medico).toBe(medico)
    })

    it('getId retorna o id', () => {
        expect(novoFuncionario(medico, 7).getId()).toBe(7)
    })

    it('getDataAdmissao retorna a data', () => {
        const data = new Date('2024-03-10')
        expect(new Funcionario(1, data, medico).getDataAdmissao()).toEqual(data)
    })

    it('getMedico retorna o médico', () => {
        expect(novoFuncionario(medico).getMedico()).toBe(medico)
    })
})
