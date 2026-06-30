import { Pessoa } from "./Pessoa";
import type { Medico } from "./Medico";
import type { Consulta } from "./Consulta";

export class Aluno extends Pessoa {
    private _matricula: string;
    private _periodo: number;
    private _curso: string;
    private _medicoOrientador: Medico;
    private _consultasParticipadas: Consulta[];

    constructor(
        id: number,
        nome: string,
        telefone: string,
        email: string,
        matricula: string,
        periodo: number,
        curso: string,
        medicoOrientador: Medico,
        consultasParticipadas: Consulta[] = []
    ) {
        super(id, nome, telefone, email);
        this._matricula = matricula;
        this._periodo = periodo;
        this._curso = curso;
        this._medicoOrientador = medicoOrientador;
        this._consultasParticipadas = consultasParticipadas;
    }

    get matricula(): string {
        return this._matricula;
    }

    getMatricula(): string {
        return this._matricula;
    }

    get periodo(): number {
        return this._periodo;
    }

    getPeriodo(): number {
        return this._periodo;
    }

    get curso(): string {
        return this._curso;
    }

    getCurso(): string {
        return this._curso;
    }

    get medicoOrientador(): Medico {
        return this._medicoOrientador;
    }

    getMedicoOrientador(): Medico {
        return this._medicoOrientador;
    }

    get consultasParticipadas(): Consulta[] {
        return [...this._consultasParticipadas];
    }

    getConsultasParticipadas(): Consulta[] {
        return [...this._consultasParticipadas];
    }
}
