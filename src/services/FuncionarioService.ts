import { Funcionario } from "../models/Funcionario";
import { medicoRepository } from "./MedicoService";
import { LocalStorageRepository } from "./storage/LocalStorageRepository";

interface FuncionarioRaw {
    id: number;
    dataAdmissao: string;
    medicoId: number;
}

export const funcionarioRepository = new LocalStorageRepository<Funcionario>(
    "diagnovetis:funcionarios",
    funcionario => ({
        id: funcionario.id,
        dataAdmissao: funcionario.dataAdmissao.toISOString(),
        medicoId: funcionario.medico.id
    }),
    raw => {
        const r = raw as FuncionarioRaw;
        const medico = medicoRepository.getById(r.medicoId);
        if (!medico) {
            throw new Error(`Medico ${r.medicoId} nao encontrado para o funcionario ${r.id}`);
        }
        return new Funcionario(r.id, new Date(r.dataAdmissao), medico);
    }
);

export class FuncionarioService {
    listarFuncionarios(): Funcionario[] {
        return funcionarioRepository.getAll();
    }

    adicionarFuncionario(funcionario: Funcionario): void {
        funcionarioRepository.add(funcionario);
    }

    buscarPorId(id: number): Funcionario | undefined {
        return funcionarioRepository.getById(id);
    }

    removerFuncionario(id: number): void {
        funcionarioRepository.remove(id);
    }
}
