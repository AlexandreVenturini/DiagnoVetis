import { useState, useCallback } from 'react'
import { Pet } from '../models/Pet'
import { Tutor } from '../models/Tutor'
import { Endereco } from '../models/Endereco'
import { PetService, petRepository } from '../services/PetService'
import { TutorService } from '../services/TutorService'
import type { Dog, DogFormData } from '../features/dogs/dogTypes'

const petService = new PetService()
const tutorService = new TutorService()

function petToDog(pet: Pet): Dog {
    return {
        id: pet.id,
        name: pet.nome,
        breed: pet.raca,
        age: pet.idade,
        weight: pet.peso,
        sex: pet.sexo,
        tutor: pet.tutor.nome,
        contact: pet.tutor.telefone,
        history: pet.historico,
    }
}

function getOrCreateTutor(nome: string, contact: string): Tutor {
    const existing = tutorService.buscarPorNome(nome)[0]
    if (existing) return existing

    const tutor = new Tutor(
        Date.now(),
        nome,
        contact,
        '',
        new Date(),
        new Endereco('', 0, '', '', '', '')
    )
    tutorService.adicionarTutor(tutor)
    return tutor
}

export function useDogs() {
    const [dogs, setDogs] = useState<Dog[]>(() =>
        petService.listarPets().map(petToDog)
    )

    const refresh = useCallback(() => {
        setDogs(petService.listarPets().map(petToDog))
    }, [])

    const createDog = useCallback((data: DogFormData) => {
        const tutor = getOrCreateTutor(data.tutor, data.contact)
        const pet = new Pet(
            Date.now(),
            data.name,
            'Cachorro',
            data.breed,
            tutor,
            [],
            data.age,
            data.weight,
            data.sex,
            data.history
        )
        petService.adicionarPet(pet)
        refresh()
    }, [refresh])

    const updateDog = useCallback((id: number, data: DogFormData) => {
        const existing = petRepository.getById(id)
        if (!existing) return

        const tutor = getOrCreateTutor(data.tutor, data.contact)
        const updated = new Pet(
            id,
            data.name,
            existing.especie,
            data.breed,
            tutor,
            existing.historicoConsulta,
            data.age,
            data.weight,
            data.sex,
            data.history
        )
        petRepository.update(updated)
        refresh()
    }, [refresh])

    const removeDog = useCallback((id: number) => {
        petService.removerPet(id)
        refresh()
    }, [refresh])

    return { dogs, createDog, updateDog, removeDog }
}
