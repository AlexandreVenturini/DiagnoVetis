import { Tutor } from "../models/Tutor";

export class TutorService {
    private tutores: Tutor[] = [];

    listarTutores(): Tutor[] {
        return this.tutores;
    }

    adicionarTutor(tutor: Tutor): void {
        this.tutores.push(tutor);
    }

    buscarPorId(id: number): Tutor | undefined {
        return this.tutores.find(
            tutor => tutor.id === id
        );
    }

    removerTutor(id: number): void {
        this.tutores = this.tutores.filter(
            tutor => tutor.id !== id
        );
    }
}