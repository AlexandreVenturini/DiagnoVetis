import { Exame } from "../models/Exame";
import { consultaRepository } from "./ConsultaService";

export class ExameService {
    listarPorConsulta(consultaId: number): Exame[] {
        return consultaRepository.getById(consultaId)?.exames ?? [];
    }

    listarTodos(): Exame[] {
        return consultaRepository.getAll().flatMap(consulta => consulta.exames);
    }

    buscarPorId(exameId: number): Exame | undefined {
        return this.listarTodos().find(e => e.id === exameId);
    }

    listarPorPet(petId: number): Exame[] {
        return consultaRepository
            .getAll()
            .filter(consulta => consulta.pet.id === petId)
            .flatMap(consulta => consulta.exames);
    }
}
