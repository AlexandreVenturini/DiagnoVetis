import { Medico } from "./Medico";
import { Pet } from "./Pet";

export class Consulta {
    private _id: number;
    private _dataConsulta: Date;
    private _horario: string;
    private _diagnostico: string;
    private _observacoes: string;
    private _medico: Medico;
    private _pet: Pet;

    constructor(
        id: number,
        dataConsulta: Date,
        horario: string,
        diagnostico: string,
        observacoes: string,
        medico: Medico,
        pet: Pet
    ) {
        this._id = id;
        this._dataConsulta = dataConsulta;
        this._horario = horario;
        this._diagnostico = diagnostico;
        this._observacoes = observacoes;
        this._medico = medico;
        this._pet = pet;
    }

    get id(): number {
        return this._id;
    }
}