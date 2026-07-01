import { Medico } from "../models/Medico";
import { LocalStorageRepository } from "./storage/LocalStorageRepository";

interface MedicoRaw {
    id: number;
    nome: string;
    telefone: string;
    email: string;
    especialidade: string;
    crmv: string;
}

export const medicoRepository = new LocalStorageRepository<Medico>(
    "diagnovetis:medicos",
    medico => ({
        id: medico.id,
        nome: medico.nome,
        telefone: medico.telefone,
        email: medico.email,
        especialidade: medico.especialidade,
        crmv: medico.crmv
    }),
    raw => {
        const medicoRaw = raw as MedicoRaw;
        return new Medico(medicoRaw.id, medicoRaw.nome, medicoRaw.telefone, medicoRaw.email, medicoRaw.especialidade, medicoRaw.crmv);
    }
);

export class MedicoService {
    listarMedicos(): Medico[] {
        return medicoRepository.getAll();
    }

    adicionarMedico(medico: Medico): void {
        medicoRepository.add(medico);
    }

    buscarPorId(id: number): Medico | undefined {
        return medicoRepository.getById(id);
    }

    listarPorEspecialidade(especialidade: string): Medico[] {
        return medicoRepository.getAll().filter(m =>
            m.especialidade.toLowerCase().includes(especialidade.toLowerCase())
        );
    }

    buscarPorCrmv(crmv: string): Medico | undefined {
        return medicoRepository.getAll().find(m => m.crmv === crmv);
    }

    removerMedico(id: number): void {
        medicoRepository.remove(id);
    }
}
