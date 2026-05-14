import { Pessoa } from "./Pessoa";

export class Tutor extends Pessoa {
    private _dataCadastro: Date;

    constructor(
        id: number,
        nome: string,
        telefone: string,
        email: string,
        dataCadastro: Date
    ) {
        super(id, nome, telefone, email);

        this._dataCadastro = dataCadastro;
    }

    get dataCadastro(): Date {
        return this._dataCadastro;
    }

    set dataCadastro(dataCadastro: Date) {
        this._dataCadastro = dataCadastro;
    }
}