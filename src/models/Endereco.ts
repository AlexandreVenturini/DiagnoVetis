export class Endereco {
    private _rua: string;
    private _numero: number;
    private _bairro: string;
    private _cidade: string;
    private _uf: string;
    private _cep: string;

    constructor(
        rua: string,
        numero: number,
        bairro: string,
        cidade: string,
        uf: string,
        cep: string
    ) {
        this._rua = rua;
        this._numero = numero;
        this._bairro = bairro;
        this._cidade = cidade;
        this._uf = uf;
        this._cep = cep;
    }

    get rua(): string {
        return this._rua;
    }

    get numero(): number {
        return this._numero;
    }
}