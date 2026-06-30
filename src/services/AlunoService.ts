import { Aluno } from "../models/Aluno";
import { medicoRepository } from "./MedicoService";
import { LocalStorageRepository } from "./storage/LocalStorageRepository";

interface AlunoRaw {
    id: number;
    nome: string;
    telefone: string;
    email: string;
    matricula: string;
    periodo: number;
    curso: string;
    medicoOrientadorId: number;
}

export const alunoRepository = new LocalStorageRepository<Aluno>(
    "diagnovetis:alunos",
    aluno => ({
        id: aluno.id,
        nome: aluno.nome,
        telefone: aluno.telefone,
        email: aluno.email,
        matricula: aluno.matricula,
        periodo: aluno.periodo,
        curso: aluno.curso,
        medicoOrientadorId: aluno.medicoOrientador.id
    }),
    raw => {
        const alunoRaw = raw as AlunoRaw;
        const medicoOrientador = medicoRepository.getById(alunoRaw.medicoOrientadorId);
        if (!medicoOrientador) {
            throw new Error(`Medico orientador ${alunoRaw.medicoOrientadorId} nao encontrado para o aluno ${alunoRaw.id}`);
        }

        return new Aluno(alunoRaw.id, alunoRaw.nome, alunoRaw.telefone, alunoRaw.email, alunoRaw.matricula, alunoRaw.periodo, alunoRaw.curso, medicoOrientador);
    }
);

export class AlunoService {
    listarAlunos(): Aluno[] {
        return alunoRepository.getAll();
    }

    adicionarAluno(aluno: Aluno): void {
        alunoRepository.add(aluno);
    }

    buscarPorId(id: number): Aluno | undefined {
        return alunoRepository.getById(id);
    }

    removerAluno(id: number): void {
        alunoRepository.remove(id);
    }
}
