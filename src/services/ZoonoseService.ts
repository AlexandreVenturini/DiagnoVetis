import { Zoonose } from "../models/Zoonose";
import { LocalStorageRepository } from "./storage/LocalStorageRepository";
import { validarObrigatorio, validarGrauRisco, validarIdUnico } from "./validation/validadores";

interface ZoonoseRaw {
    id: number;
    nome: string;
    agenteEtiologico: string;
    sintomas: string;
    medidasPreventivas: string;
    grauRisco: string;
}

export const zoonoseRepository = new LocalStorageRepository<Zoonose>(
    "diagnovetis:zoonoses",
    zoonose => ({
        id: zoonose.id,
        nome: zoonose.nome,
        agenteEtiologico: zoonose.agenteEtiologico,
        sintomas: zoonose.sintomas,
        medidasPreventivas: zoonose.medidasPreventivas,
        grauRisco: zoonose.grauRisco
    }),
    raw => {
        const r = raw as ZoonoseRaw;
        return new Zoonose(r.id, r.nome, r.agenteEtiologico, r.sintomas, r.medidasPreventivas, r.grauRisco);
    }
);

export class ZoonoseService {
    listarZoonoses(): Zoonose[] {
        return zoonoseRepository.getAll();
    }

    adicionarZoonose(zoonose: Zoonose): void {
        validarIdUnico(zoonose.id, zoonoseRepository.getAll(), "zoonose");
        validarObrigatorio(zoonose.nome, "nome");
        validarObrigatorio(zoonose.agenteEtiologico, "agenteEtiologico");
        validarObrigatorio(zoonose.sintomas, "sintomas");
        validarObrigatorio(zoonose.medidasPreventivas, "medidasPreventivas");
        validarGrauRisco(zoonose.grauRisco, "grauRisco");
        zoonoseRepository.add(zoonose);
    }

    buscarPorId(id: number): Zoonose | undefined {
        return zoonoseRepository.getById(id);
    }

    buscarPorNome(nome: string): Zoonose[] {
        return zoonoseRepository.getAll().filter(z =>
            z.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    listarAltoRisco(): Zoonose[] {
        return zoonoseRepository.getAll().filter(z => z.isAltoRisco());
    }

    removerZoonose(id: number): void {
        zoonoseRepository.remove(id);
    }

    atualizarZoonose(zoonose: Zoonose): void {
        zoonoseRepository.update(zoonose);
    }
}
