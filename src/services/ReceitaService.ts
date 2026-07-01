import { Receita } from "../models/Receita";
import { consultaRepository } from "./ConsultaService";

export class ReceitaService {
    listarPorConsulta(consultaId: number): Receita[] {
        return consultaRepository.getById(consultaId)?.receitas ?? [];
    }

    listarTodas(): Receita[] {
        return consultaRepository.getAll().flatMap(consulta => consulta.receitas);
    }

    buscarPorId(receitaId: number): Receita | undefined {
        return this.listarTodas().find(r => r.id === receitaId);
    }

    listarPorPet(petId: number): Receita[] {
        return consultaRepository
            .getAll()
            .filter(consulta => consulta.pet.id === petId)
            .flatMap(consulta => consulta.receitas);
    }
}
