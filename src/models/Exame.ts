export class Exame {
    private _id: number;
    private _nomeExame: string;
    private _dataExame: Date;
    private _resultado: string;

    constructor(
        id: number,
        nomeExame: string,
        dataExame: Date,
        resultado: string
    ) {
        this._id = id;
        this._nomeExame = nomeExame;
        this._dataExame = dataExame;
        this._resultado = resultado;
    }

    get nomeExame(): string {
        return this._nomeExame;
    }

    get resultado(): string {
        return this._resultado;
    }
}