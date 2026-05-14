import { Tutor } from "./Tutor";

export class Pet {
    private _id: number;
    private _nome: string;
    private _especie: string;
    private _raca: string;
    private _tutor: Tutor;

    constructor(
        id: number,
        nome: string,
        especie: string,
        raca: string,
        tutor: Tutor
    ) {
        this._id = id;
        this._nome = nome;
        this._especie = especie;
        this._raca = raca;
        this._tutor = tutor;
    }

    get id(): number {
        return this._id;
    }

    get nome(): string {
        return this._nome;
    }
}