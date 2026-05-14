import { Medico } from "../models/Medico";

export class MedicoService {
    private medicos: Medico[] = [];

    listarMedicos(): Medico[] {
        return this.medicos;
    }

    adicionarMedico(medico: Medico): void {
        this.medicos.push(medico);
    }
}