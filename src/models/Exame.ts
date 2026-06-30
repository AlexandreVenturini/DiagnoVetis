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

    get id(): number {
        return this._id;
    }

    getId(): number {
        return this._id;
    }

    getNomeExame(): string {
        return this._nomeExame;
    }

    get dataExame(): Date {
        return this._dataExame;
    }

    getDataExame(): Date {
        return this._dataExame;
    }

    get resultado(): string {
        return this._resultado;
    }

    getResultado(): string {
        return this._resultado;
    }

    set resultado(resultado: string) {
        this._resultado = resultado;
    }

    setResultado(resultado: string): void {
        this._resultado = resultado;
    }
}
