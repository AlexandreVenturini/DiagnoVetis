import type { Medicamento } from "./Medicamento";

export class MedicamentoReceitado {
    private _quantidade: number;
    private _dose: string;
    private _vezesAoDia: number;
    private _duracaoDias: number;
    private _medicamento: Medicamento;
    private _observacao: string;

    constructor(
        quantidade: number,
        dose: string,
        vezesAoDia: number,
        duracaoDias: number,
        medicamento: Medicamento,
        observacao: string
    ) {
        this._quantidade = quantidade;
        this._dose = dose;
        this._vezesAoDia = vezesAoDia;
        this._duracaoDias = duracaoDias;
        this._medicamento = medicamento;
        this._observacao = observacao;
    }

    get quantidade(): number {
        return this._quantidade;
    }

    getQuantidade(): number {
        return this._quantidade;
    }

    get dose(): string {
        return this._dose;
    }

    getDose(): string {
        return this._dose;
    }

    get vezesAoDia(): number {
        return this._vezesAoDia;
    }

    get duracaoDias(): number {
        return this._duracaoDias;
    }

    get medicamento(): Medicamento {
        return this._medicamento;
    }

    get observacao(): string {
        return this._observacao;
    }

    getObservacao(): string {
        return this._observacao;
    }
}
