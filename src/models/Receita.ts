import { Consulta } from "./Consulta";

export class Receita {
    private _id: number;
    private _nome: string;
    private _dosagem: string;
    private _frequencia: string;
    private _consulta: Consulta;

    constructor(
        id: number,
        nome: string,
        dosagem: string,
        frequencia: string,
        consulta: Consulta
    ) {
        this._id = id;
        this._nome = nome;
        this._dosagem = dosagem;
        this._frequencia = frequencia;
        this._consulta = consulta;
    }

    get nome(): string {
        return this._nome;
    }
}