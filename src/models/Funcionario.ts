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

    get id(): number {
        return this._id;
    }

    getId(): number {
        return this._id;
    }

    getDataAdmissao(): Date {
        return this._dataAdmissao;
    }

    get medico(): Medico {
        return this._medico;
    }

    getMedico(): Medico {
        return this._medico;
    }
}
