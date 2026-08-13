import { describe, it, expect, beforeEach } from 'vitest'
import './setup'
import { Zoonose } from '../models/Zoonose'
import { ZoonoseService } from '../services/ZoonoseService'
import { ValidacaoError } from '../services/validation/ValidacaoError'

function novaZoonose(id = 1, grau = 'alto'): Zoonose {
    return new Zoonose(id, 'Leishmaniose', 'Leishmania infantum', 'Febre, perda de peso', 'Uso de repelente, vacinação', grau)
}

let service: ZoonoseService

beforeEach(() => {
    service = new ZoonoseService()
})

describe('ZoonoseService.adicionarZoonose', () => {
    it('adiciona zoonose válida com sucesso', () => {
        service.adicionarZoonose(novaZoonose())
        expect(service.listarZoonoses()).toHaveLength(1)
    })

    it('lança erro para id duplicado', () => {
        service.adicionarZoonose(novaZoonose(1))
        expect(() => service.adicionarZoonose(novaZoonose(1))).toThrow(ValidacaoError)
    })

    it('lança erro para nome vazio', () => {
        const z = new Zoonose(1, '', 'Leishmania infantum', 'Febre', 'Vacinação', 'alto')
        expect(() => service.adicionarZoonose(z)).toThrow(ValidacaoError)
    })

    it('lança erro para agente etiológico vazio', () => {
        const z = new Zoonose(1, 'Leishmaniose', '', 'Febre', 'Vacinação', 'alto')
        expect(() => service.adicionarZoonose(z)).toThrow(ValidacaoError)
    })

    it('lança erro para sintomas vazios', () => {
        const z = new Zoonose(1, 'Leishmaniose', 'Leishmania infantum', '', 'Vacinação', 'alto')
        expect(() => service.adicionarZoonose(z)).toThrow(ValidacaoError)
    })

    it('lança erro para medidas preventivas vazias', () => {
        const z = new Zoonose(1, 'Leishmaniose', 'Leishmania infantum', 'Febre', '', 'alto')
        expect(() => service.adicionarZoonose(z)).toThrow(ValidacaoError)
    })

    it('lança erro para grau de risco inválido', () => {
        const z = new Zoonose(1, 'Leishmaniose', 'Leishmania infantum', 'Febre', 'Vacinação', 'crítico')
        expect(() => service.adicionarZoonose(z)).toThrow(ValidacaoError)
    })

    it('aceita grau de risco "baixo"', () => {
        expect(() => service.adicionarZoonose(novaZoonose(1, 'baixo'))).not.toThrow()
    })

    it('aceita grau de risco "medio"', () => {
        expect(() => service.adicionarZoonose(novaZoonose(1, 'medio'))).not.toThrow()
    })
})

describe('ZoonoseService.listarAltoRisco', () => {
    it('retorna apenas zoonoses de alto risco', () => {
        service.adicionarZoonose(novaZoonose(1, 'alto'))
        service.adicionarZoonose(novaZoonose(2, 'medio'))
        service.adicionarZoonose(novaZoonose(3, 'baixo'))
        expect(service.listarAltoRisco()).toHaveLength(1)
        expect(service.listarAltoRisco()[0].grauRisco).toBe('alto')
    })

    it('retorna lista vazia quando não há zoonoses de alto risco', () => {
        service.adicionarZoonose(novaZoonose(1, 'baixo'))
        expect(service.listarAltoRisco()).toHaveLength(0)
    })
})

describe('ZoonoseService.buscarPorNome', () => {
    it('encontra zoonose pelo nome parcial', () => {
        service.adicionarZoonose(novaZoonose())
        expect(service.buscarPorNome('leish')).toHaveLength(1)
    })

    it('retorna lista vazia para nome inexistente', () => {
        service.adicionarZoonose(novaZoonose())
        expect(service.buscarPorNome('raiva')).toHaveLength(0)
    })
})

describe('ZoonoseService.atualizarZoonose', () => {
    it('atualiza zoonose existente', () => {
        service.adicionarZoonose(novaZoonose())
        const atualizada = new Zoonose(1, 'Raiva', 'Lyssavirus', 'Hidrofobia', 'Vacinação', 'alto')
        service.atualizarZoonose(atualizada)
        expect(service.buscarPorId(1)?.nome).toBe('Raiva')
    })
})

describe('ZoonoseService.removerZoonose', () => {
    it('remove zoonose existente', () => {
        service.adicionarZoonose(novaZoonose())
        service.removerZoonose(1)
        expect(service.listarZoonoses()).toHaveLength(0)
    })
})
