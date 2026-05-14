import { Pet } from "../models/Pet";

export class PetService {
    private pets: Pet[] = [];

    listarPets(): Pet[] {
        return this.pets;
    }

    adicionarPet(pet: Pet): void {
        this.pets.push(pet);
    }

    buscarPorId(id: number): Pet | undefined {
        return this.pets.find(pet => pet.id === id);
    }

    removerPet(id: number): void {
        this.pets = this.pets.filter(pet => pet.id !== id);
    }
}