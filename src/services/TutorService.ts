import { Tutor } from "../models/Tutor";
import { Endereco } from "../models/Endereco";
import { LocalStorageRepository } from "./storage/LocalStorageRepository";
import { validarObrigatorio, validarEmail, validarTelefone, validarCep, validarData, validarIdUnico } from "./validation/validadores";

interface EnderecoRaw {
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
}

interface TutorRaw {
    id: number;
    nome: string;
    telefone: string;
    email: string;
    dataCadastro: string;
    endereco: EnderecoRaw;
}

export const tutorRepository = new LocalStorageRepository<Tutor>(
    "diagnovetis:tutores",
    tutor => ({
        id: tutor.id,
        nome: tutor.nome,
        telefone: tutor.telefone,
        email: tutor.email,
        dataCadastro: tutor.dataCadastro.toISOString(),
        endereco: {
            rua: tutor.endereco.rua,
            numero: tutor.endereco.numero,
            bairro: tutor.endereco.bairro,
            cidade: tutor.endereco.cidade,
            uf: tutor.endereco.uf,
            cep: tutor.endereco.cep
        }
    }),
    // pets sao religados pelo PetService ao carregar (Tutor nasce sem pets aqui)
    raw => {
        const tutorRaw = raw as TutorRaw;
        return new Tutor(
            tutorRaw.id,
            tutorRaw.nome,
            tutorRaw.telefone,
            tutorRaw.email,
            new Date(tutorRaw.dataCadastro),
            new Endereco(
                tutorRaw.endereco.rua,
                tutorRaw.endereco.numero,
                tutorRaw.endereco.bairro,
                tutorRaw.endereco.cidade,
                tutorRaw.endereco.uf,
                tutorRaw.endereco.cep
            )
        );
    }
);

export class TutorService {
    listarTutores(): Tutor[] {
        return tutorRepository.getAll();
    }

    adicionarTutor(tutor: Tutor): void {
        validarIdUnico(tutor.id, tutorRepository.getAll(), "tutor");
        validarObrigatorio(tutor.nome, "nome");
        validarEmail(tutor.email, "email");
        validarTelefone(tutor.telefone, "telefone");
        validarData(tutor.dataCadastro, "dataCadastro");
        validarObrigatorio(tutor.endereco.rua, "rua");
        validarObrigatorio(tutor.endereco.cidade, "cidade");
        validarObrigatorio(tutor.endereco.uf, "uf");
        validarCep(tutor.endereco.cep, "cep");
        tutorRepository.add(tutor);
    }

    buscarPorId(id: number): Tutor | undefined {
        return tutorRepository.getById(id);
    }

    buscarPorNome(nome: string): Tutor[] {
        return tutorRepository.getAll().filter(t =>
            t.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    buscarPorEmail(email: string): Tutor | undefined {
        return tutorRepository.getAll().find(t =>
            t.email.toLowerCase() === email.toLowerCase()
        );
    }

    removerTutor(id: number): void {
        tutorRepository.remove(id);
    }

    atualizarTutor(tutor: Tutor): void {
        tutorRepository.update(tutor);
    }
}
