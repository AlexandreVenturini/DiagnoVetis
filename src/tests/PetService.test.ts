import { describe, it, expect, beforeEach } from 'vitest'
import './setup'
import { Pet } from '../models/Pet'
import { Tutor } from '../models/Tutor'
import { Endereco } from '../models/Endereco'
import { PetService } from '../services/PetService'
import { TutorService } from '../services/TutorService'
import { ValidacaoError } from '../services/validation/ValidacaoError'

function criarTutor(id = 1): Tutor {
    return new Tutor(id, 'Ana Costa', '27933001234', 'ana@email.com', new Date('2024-01-01'), new Endereco('Rua A', 1, 'Bairro', 'Vitória', 'ES', '29010100'))
}

function novoPet(tutor: Tutor, id = 1): Pet {
    return new Pet(id, 'Rex', 'Cão', 'Labrador', tutor)
}

let petService: PetService
let tutorService: TutorService
let tutor: Tutor

beforeEach(() => {
    petService = new PetService()
    tutorService = new TutorService()
    tutor = criarTutor()
    tutorService.adicionarTutor(tutor)
})

describe('PetService.adicionarPet', () => {
    it('adiciona pet válido com sucesso', () => {
        petService.adicionarPet(novoPet(tutor))
        expect(petService.listarPets()).toHaveLength(1)
    })

    it('vincula pet ao tutor após adicionar', () => {
        const pet = novoPet(tutor)
        petService.adicionarPet(pet)
        expect(tutor.pets).toHaveLength(1)
    })

    it('lança erro para id duplicado', () => {
        petService.adicionarPet(novoPet(tutor, 1))
        expect(() => petService.adicionarPet(novoPet(tutor, 1))).toThrow(ValidacaoError)
    })

    it('lança erro para nome vazio', () => {
        const pet = new Pet(1, '', 'Cão', 'Labrador', tutor)
        expect(() => petService.adicionarPet(pet)).toThrow(ValidacaoError)
    })

    it('lança erro para espécie vazia', () => {
        const pet = new Pet(1, 'Rex', '', 'Labrador', tutor)
        expect(() => petService.adicionarPet(pet)).toThrow(ValidacaoError)
    })

    it('lança erro para raça vazia', () => {
        const pet = new Pet(1, 'Rex', 'Cão', '', tutor)
        expect(() => petService.adicionarPet(pet)).toThrow(ValidacaoError)
    })
})

describe('PetService.listarPorTutor', () => {
    it('lista pets de um tutor específico', () => {
        const tutor2 = new Tutor(2, 'Bruno', '27988880000', 'bruno@email.com', new Date(), new Endereco('Rua B', 2, 'Bairro', 'Vila Velha', 'ES', '29100100'))
        tutorService.adicionarTutor(tutor2)
        petService.adicionarPet(novoPet(tutor, 1))
        petService.adicionarPet(new Pet(2, 'Luna', 'Gato', 'Siamês', tutor2))
        expect(petService.listarPorTutor(1)).toHaveLength(1)
        expect(petService.listarPorTutor(2)).toHaveLength(1)
    })
})

describe('PetService.listarPorEspecie', () => {
    it('filtra pets pela espécie', () => {
        const tutor2 = new Tutor(2, 'Bruno', '27988880000', 'bruno@email.com', new Date(), new Endereco('Rua B', 2, 'Bairro', 'Vila Velha', 'ES', '29100100'))
        tutorService.adicionarTutor(tutor2)
        petService.adicionarPet(novoPet(tutor, 1))
        petService.adicionarPet(new Pet(2, 'Luna', 'Gato', 'Siamês', tutor2))
        expect(petService.listarPorEspecie('Cão')).toHaveLength(1)
    })
})

describe('PetService.buscarPorNome', () => {
    it('encontra pet pelo nome parcial', () => {
        petService.adicionarPet(novoPet(tutor))
        expect(petService.buscarPorNome('rex')).toHaveLength(1)
    })
})

describe('PetService.removerPet', () => {
    it('remove pet existente', () => {
        petService.adicionarPet(novoPet(tutor))
        petService.removerPet(1)
        expect(petService.listarPets()).toHaveLength(0)
    })
})
