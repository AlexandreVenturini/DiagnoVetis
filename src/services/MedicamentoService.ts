import { Medicamento } from "../models/Medicamento";
import { LocalStorageRepository } from "./storage/LocalStorageRepository";
import { validarObrigatorio, validarPositivo, validarIdUnico } from "./validation/validadores";

interface MedicamentoRaw {
    id: number;
    nomeComercial: string;
    principioAtivo: string;
    descricao: string;
    concentracao: number;
    unidadeConcentracao: string;
    formaFarmaceutica: string;
    viaAdministracao: string;
    tipoUso: string;
}

export const medicamentoRepository = new LocalStorageRepository<Medicamento>(
    "diagnovetis:medicamentos",
    medicamento => ({
        id: medicamento.id,
        nomeComercial: medicamento.nome,
        principioAtivo: medicamento.principioAtivo,
        descricao: medicamento.descricao,
        concentracao: medicamento.concentracao,
        unidadeConcentracao: medicamento.unidadeConcentracao,
        formaFarmaceutica: medicamento.formaFarmaceutica,
        viaAdministracao: medicamento.viaAdministracao,
        tipoUso: medicamento.tipo
    }),
    raw => {
        const r = raw as MedicamentoRaw;
        return new Medicamento(r.id, r.nomeComercial, r.principioAtivo, r.descricao, r.concentracao, r.unidadeConcentracao, r.formaFarmaceutica, r.viaAdministracao, r.tipoUso);
    }
);

export class MedicamentoService {
    listarMedicamentos(): Medicamento[] {
        return medicamentoRepository.getAll();
    }

    adicionarMedicamento(medicamento: Medicamento): void {
        validarIdUnico(medicamento.id, medicamentoRepository.getAll(), "medicamento");
        validarObrigatorio(medicamento.nome, "nomeComercial");
        validarObrigatorio(medicamento.principioAtivo, "principioAtivo");
        validarObrigatorio(medicamento.formaFarmaceutica, "formaFarmaceutica");
        validarObrigatorio(medicamento.viaAdministracao, "viaAdministracao");
        validarPositivo(medicamento.concentracao, "concentracao");
        medicamentoRepository.add(medicamento);
    }

    buscarPorId(id: number): Medicamento | undefined {
        return medicamentoRepository.getById(id);
    }

    buscarPorNome(nome: string): Medicamento[] {
        return medicamentoRepository.getAll().filter(m =>
            m.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    buscarPorPrincipioAtivo(principioAtivo: string): Medicamento[] {
        return medicamentoRepository.getAll().filter(m =>
            m.principioAtivo.toLowerCase().includes(principioAtivo.toLowerCase())
        );
    }

    removerMedicamento(id: number): void {
        medicamentoRepository.remove(id);
    }

    atualizarMedicamento(medicamento: Medicamento): void {
        medicamentoRepository.update(medicamento);
    }
}
