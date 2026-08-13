import { describe, it, expect, beforeEach } from 'vitest'
import './setup'
import { Aluno } from '../models/Aluno'
import { Medico } from '../models/Medico'
import { AlunoService } from '../services/AlunoService'
import { MedicoService } from '../services/MedicoService'
import { ValidacaoError } from '../services/validation/ValidacaoError'

function criarMedico(id = 1): Medico {
    return new Medico(id, 'Dr. Silva', '27933001234', 'silva@vet.com', 'Clínica Geral', '12345-ES')
}

function novoAluno(medico: Medico, id = 1): Aluno {
    return new Aluno(id, 'Maria Souza', '27911112222', 'maria@ifes.edu.br', '20221001', 3, 'Medicina Veterinária', medico)
}

let service: AlunoService
let medicoService: MedicoService
let medico: Medico

beforeEach(() => {
    service = new AlunoService()
    medicoService = new MedicoService()
    medico = criarMedico()
    medicoService.adicionarMedico(medico)
})

describe('AlunoService.adicionarAluno', () => {
    it('adiciona aluno válido com sucesso', () => {
        service.adicionarAluno(novoAluno(medico))
        expect(service.listarAlunos()).toHaveLength(1)
    })

    it('lança erro para id duplicado', () => {
        service.adicionarAluno(novoAluno(medico, 1))
        expect(() => service.adicionarAluno(novoAluno(medico, 1))).toThrow(ValidacaoError)
    })

    it('lança erro para nome vazio', () => {
        const aluno = new Aluno(1, '', '27911112222', 'maria@ifes.edu.br', '20221001', 3, 'Medicina Veterinária', medico)
        expect(() => service.adicionarAluno(aluno)).toThrow(ValidacaoError)
    })

    it('lança erro para e-mail não institucional', () => {
        const aluno = new Aluno(1, 'Maria', '27911112222', 'maria@gmail.com', '20221001', 3, 'Medicina Veterinária', medico)
        expect(() => service.adicionarAluno(aluno)).toThrow(ValidacaoError)
    })

    it('lança erro para e-mail vazio', () => {
        const aluno = new Aluno(1, 'Maria', '27911112222', '', '20221001', 3, 'Medicina Veterinária', medico)
        expect(() => service.adicionarAluno(aluno)).toThrow(ValidacaoError)
    })

    it('lança erro para telefone inválido', () => {
        const aluno = new Aluno(1, 'Maria', '123', 'maria@ifes.edu.br', '20221001', 3, 'Medicina Veterinária', medico)
        expect(() => service.adicionarAluno(aluno)).toThrow(ValidacaoError)
    })

    it('lança erro para matrícula vazia', () => {
        const aluno = new Aluno(1, 'Maria', '27911112222', 'maria@ifes.edu.br', '', 3, 'Medicina Veterinária', medico)
        expect(() => service.adicionarAluno(aluno)).toThrow(ValidacaoError)
    })

    it('lança erro para período inválido (0)', () => {
        const aluno = new Aluno(1, 'Maria', '27911112222', 'maria@ifes.edu.br', '20221001', 0, 'Medicina Veterinária', medico)
        expect(() => service.adicionarAluno(aluno)).toThrow(ValidacaoError)
    })

    it('lança erro para período inválido (11)', () => {
        const aluno = new Aluno(1, 'Maria', '27911112222', 'maria@ifes.edu.br', '20221001', 11, 'Medicina Veterinária', medico)
        expect(() => service.adicionarAluno(aluno)).toThrow(ValidacaoError)
    })

    it('lança erro para curso vazio', () => {
        const aluno = new Aluno(1, 'Maria', '27911112222', 'maria@ifes.edu.br', '20221001', 3, '', medico)
        expect(() => service.adicionarAluno(aluno)).toThrow(ValidacaoError)
    })
})

describe('AlunoService.buscarPorId', () => {
    it('retorna aluno existente', () => {
        service.adicionarAluno(novoAluno(medico))
        expect(service.buscarPorId(1)?.nome).toBe('Maria Souza')
    })

    it('retorna undefined para id inexistente', () => {
        expect(service.buscarPorId(99)).toBeUndefined()
    })
})

describe('AlunoService.removerAluno', () => {
    it('remove aluno existente', () => {
        service.adicionarAluno(novoAluno(medico))
        service.removerAluno(1)
        expect(service.listarAlunos()).toHaveLength(0)
    })
})
