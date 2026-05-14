export class Zoonose {
    private _id: number;
    private _nome: string;
    private _agenteEtiologico: string;
    private _sintomas: string;
    private _medidasPreventivas: string;
    private _grauRisco: string;

    constructor(
        id: number,
        nome: string,
        agenteEtiologico: string,
        sintomas: string,
        medidasPreventivas: string,
        grauRisco: string
    ) {
        this._id = id;
        this._nome = nome;
        this._agenteEtiologico = agenteEtiologico;
        this._sintomas = sintomas;
        this._medidasPreventivas = medidasPreventivas;
        this._grauRisco = grauRisco;
    }

    get nome(): string {
        return this._nome;
    }
}