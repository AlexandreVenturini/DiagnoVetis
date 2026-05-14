import { Consulta } from "../models/Consulta";

export class ConsultaService {
    private consultas: Consulta[] = [];

    listarConsultas(): Consulta[] {
        return this.consultas;
    }

    adicionarConsulta(consulta: Consulta): void {
        this.consultas.push(consulta);
    }

    buscarPorId(id: number): Consulta | undefined {
        return this.consultas.find(
            consulta => consulta.id === id
        );
    }
}