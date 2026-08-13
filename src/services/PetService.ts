import { Pet } from "../models/Pet";
import { tutorRepository } from "./TutorService";
import { LocalStorageRepository } from "./storage/LocalStorageRepository";
import { validarObrigatorio, validarIdUnico } from "./validation/validadores";

interface PetRaw {
    id: number;
    nome: string;
    especie: string;
    raca: string;
    tutorId: number;
    idade: string;
    peso: string;
    sexo: string;
    historico: string;
}

export const petRepository = new LocalStorageRepository<Pet>(
    "diagnovetis:pets",
    pet => ({
        id: pet.id,
        nome: pet.nome,
        especie: pet.especie,
        raca: pet.raca,
        tutorId: pet.tutor.id,
        idade: pet.idade,
        peso: pet.peso,
        sexo: pet.sexo,
        historico: pet.historico
    }),
    raw => {
        const petRaw = raw as PetRaw;
        const tutor = tutorRepository.getById(petRaw.tutorId);
        if (!tutor) {
            throw new Error(`Tutor ${petRaw.tutorId} nao encontrado para o pet ${petRaw.id}`);
        }

        const pet = new Pet(petRaw.id, petRaw.nome, petRaw.especie, petRaw.raca, tutor, [], petRaw.idade ?? '', petRaw.peso ?? '', petRaw.sexo ?? '', petRaw.historico ?? '');
        tutor.adicionarPet(pet);
        return pet;
    }
);

export class PetService {
    listarPets(): Pet[] {
        return petRepository.getAll();
    }

    adicionarPet(pet: Pet): void {
        validarIdUnico(pet.id, petRepository.getAll(), "pet");
        validarObrigatorio(pet.nome, "nome");
        validarObrigatorio(pet.especie, "especie");
        validarObrigatorio(pet.raca, "raca");
        pet.tutor.adicionarPet(pet);
        petRepository.add(pet);
    }

    buscarPorId(id: number): Pet | undefined {
        return petRepository.getById(id);
    }

    listarPorTutor(tutorId: number): Pet[] {
        return petRepository.getAll().filter(p => p.tutor.id === tutorId);
    }

    listarPorEspecie(especie: string): Pet[] {
        return petRepository.getAll().filter(p =>
            p.especie.toLowerCase() === especie.toLowerCase()
        );
    }

    buscarPorNome(nome: string): Pet[] {
        return petRepository.getAll().filter(p =>
            p.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    removerPet(id: number): void {
        petRepository.remove(id);
    }
}
