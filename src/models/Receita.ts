import type { MedicamentoReceitado } from "./MedicamentoReceitado";

export class Receita {
    private _id: number;
    private _medicamentosReceitados: MedicamentoReceitado[];

    constructor(
        id: number,
        medicamentosReceitados: MedicamentoReceitado[] = []
    ) {
        this._id = id;
        this._medicamentosReceitados = medicamentosReceitados;
    }

    get id(): number {
        return this._id;
    }

    getId(): number {
        return this._id;
    }

    get medicamentosReceitados(): MedicamentoReceitado[] {
        return [...this._medicamentosReceitados];
    }

    getMedicamentosReceitados(): MedicamentoReceitado[] {
        return [...this._medicamentosReceitados];
    }

    adicionarMedicamento(medicamentoReceitado: MedicamentoReceitado): void {
        this._medicamentosReceitados.push(medicamentoReceitado);
    }

    removerMedicamento(medicamentoReceitado: MedicamentoReceitado): void {
        this._medicamentosReceitados = this._medicamentosReceitados.filter(
            medicamento => medicamento !== medicamentoReceitado
        );
    }
}
