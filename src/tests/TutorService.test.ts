import { describe, it, expect, beforeEach } from 'vitest'
import './setup'
import { Tutor } from '../models/Tutor'
import { Endereco } from '../models/Endereco'
import { TutorService } from '../services/TutorService'
import { ValidacaoError } from '../services/validation/ValidacaoError'

function criarEndereco(): Endereco {
    return new Endereco('Rua das Flores', 100, 'Centro', 'Vitória', 'ES', '29010100')
}

function novoTutor(id = 1): Tutor {
    return new Tutor(id, 'Ana Costa', '27933001234', 'ana@email.com', new Date('2024-01-01'), criarEndereco())
}

let service: TutorService

beforeEach(() => {
    service = new TutorService()
})

describe('TutorService.adicionarTutor', () => {
    it('adiciona tutor válido com sucesso', () => {
        service.adicionarTutor(novoTutor())
        expect(service.listarTutores()).toHaveLength(1)
    })

    it('lança erro para id duplicado', () => {
        service.adicionarTutor(novoTutor(1))
        expect(() => service.adicionarTutor(novoTutor(1))).toThrow(ValidacaoError)
    })

    it('lança erro para nome vazio', () => {
        const tutor = new Tutor(1, '', '27933001234', 'ana@email.com', new Date(), criarEndereco())
        expect(() => service.adicionarTutor(tutor)).toThrow(ValidacaoError)
    })

    it('lança erro para e-mail inválido', () => {
        const tutor = new Tutor(1, 'Ana', '27933001234', 'email-invalido', new Date(), criarEndereco())
        expect(() => service.adicionarTutor(tutor)).toThrow(ValidacaoError)
    })

    it('lança erro para CEP inválido', () => {
        const endereco = new Endereco('Rua A', 1, 'Bairro', 'Cidade', 'ES', '123')
        const tutor = new Tutor(1, 'Ana', '27933001234', 'ana@email.com', new Date(), endereco)
        expect(() => service.adicionarTutor(tutor)).toThrow(ValidacaoError)
    })
})

describe('TutorService.buscarPorNome', () => {
    it('encontra tutores pelo nome parcial', () => {
        service.adicionarTutor(novoTutor(1))
        service.adicionarTutor(new Tutor(2, 'Carlos Souza', '27988880000', 'carlos@email.com', new Date(), criarEndereco()))
        expect(service.buscarPorNome('ana')).toHaveLength(1)
    })
})

describe('TutorService.buscarPorEmail', () => {
    it('encontra tutor pelo e-mail exato', () => {
        service.adicionarTutor(novoTutor())
        expect(service.buscarPorEmail('ana@email.com')?.nome).toBe('Ana Costa')
    })

    it('retorna undefined para e-mail inexistente', () => {
        expect(service.buscarPorEmail('inexistente@email.com')).toBeUndefined()
    })
})

describe('TutorService.atualizarTutor', () => {
    it('atualiza tutor existente', () => {
        service.adicionarTutor(novoTutor())
        const atualizado = new Tutor(1, 'Ana Oliveira', '27933001234', 'ana@email.com', new Date('2024-01-01'), criarEndereco())
        service.atualizarTutor(atualizado)
        expect(service.buscarPorId(1)?.nome).toBe('Ana Oliveira')
    })
})

describe('TutorService.removerTutor', () => {
    it('remove tutor existente', () => {
        service.adicionarTutor(novoTutor())
        service.removerTutor(1)
        expect(service.listarTutores()).toHaveLength(0)
    })
})
