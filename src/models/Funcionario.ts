import { Medico } from "./Medico";

export class Funcionario {
    private _id: number;
    private _dataAdmissao: Date;
    private _medico: Medico;

    constructor(
        id: number,
        dataAdmissao: Date,
        medico: Medico
    ) {
        this._id = id;
        this._dataAdmissao = dataAdmissao;
        this._medico = medico;
    }

    get dataAdmissao(): Date {
        return this._dataAdmissao;
    }
}